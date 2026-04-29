<?php

namespace Bugo\FilamentErDiagram\Support;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasManyThrough;
use Illuminate\Database\Eloquent\Relations\HasOne;
use Illuminate\Database\Eloquent\Relations\HasOneThrough;
use Illuminate\Database\Eloquent\Relations\MorphMany;
use Illuminate\Database\Eloquent\Relations\MorphOne;
use Illuminate\Database\Eloquent\Relations\MorphTo;
use Illuminate\Database\Eloquent\Relations\MorphToMany;
use Illuminate\Database\Eloquent\Relations\Relation;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Schema;
use ReflectionClass;
use ReflectionException;
use ReflectionMethod;
use ReflectionNamedType;
use Throwable;

class ModelInspector
{
    /** @var array<class-string, string> */
    protected array $relationTypeMap = [
        HasOne::class         => 'hasOne',
        HasMany::class        => 'hasMany',
        BelongsTo::class      => 'belongsTo',
        BelongsToMany::class  => 'belongsToMany',
        HasOneThrough::class  => 'hasOneThrough',
        HasManyThrough::class => 'hasManyThrough',
        MorphOne::class       => 'morphOne',
        MorphMany::class      => 'morphMany',
        MorphTo::class        => 'morphTo',
        MorphToMany::class    => 'morphToMany',
    ];

    /**
     * @param  class-string<Model>[]  $excludedModels
     */
    public function __construct(
        protected array $excludedModels = [],
    ) {}

    /**
     * Scan a models directory and return diagram-ready data.
     *
     * @return array{nodes: list<array<string,mixed>>, edges: list<array<string,string>>}
     * @throws ReflectionException
     */
    public function scan(string $modelsPath): array
    {
        $classes = $this->discoverModelClasses($modelsPath);

        $nodes = [];

        foreach ($classes as $class) {
            $node = $this->inspectModel($class);

            if ($node !== null) {
                $nodes[$class] = $node;
            }
        }

        $edges = [];

        foreach (array_keys($nodes) as $class) {
            foreach ($this->detectRelationships($class) as $rel) {
                if (isset($nodes[$rel['related']])) {
                    $edges[] = [
                        'source' => class_basename($class),
                        'target' => class_basename($rel['related']),
                        'type'   => $rel['type'],
                        'name'   => $rel['name'],
                    ];
                }
            }
        }

        return [
            'nodes' => array_values($nodes),
            'edges' => $edges,
        ];
    }

    /**
     * @return class-string<Model>[]
     */
    private function discoverModelClasses(string $modelsPath): array
    {
        $fullPath = $this->resolvePath($modelsPath);

        if ($fullPath === null || ! File::exists($fullPath)) {
            return [];
        }

        $classes = [];

        foreach (File::allFiles($fullPath) as $file) {
            $class = $this->resolveClassFromFile($file->getRealPath());

            if (
                $class !== null
                && class_exists($class)
                && is_subclass_of($class, Model::class)
                && ! in_array($class, $this->excludedModels, strict: true)
            ) {
                $classes[] = $class;
            }
        }

        return $classes;
    }

    /**
     * Resolve a potentially relative models path to an absolute path.
     * Tries base_path() first (standard Laravel app), then falls back to
     * the current working directory (useful in package/test environments
     * where base_path() points to the orchestra/testbench skeleton).
     */
    private function resolvePath(string $modelsPath): ?string
    {
        // Already absolute
        if (File::isDirectory($modelsPath)) {
            return $modelsPath;
        }

        // Try Laravel's base_path()
        $candidate = base_path($modelsPath);
        if (File::isDirectory($candidate)) {
            return $candidate;
        }

        // Fall back to the current working directory
        $candidate = getcwd() . DIRECTORY_SEPARATOR . ltrim($modelsPath, '/\\');
        if (File::isDirectory($candidate)) {
            return $candidate;
        }

        return null;
    }

    /**
     * Extract the fully-qualified class name from a PHP file by parsing its
     * namespace and class declarations.
     *
     * @return class-string|null
     */
    private function resolveClassFromFile(string $filePath): ?string
    {
        $contents = file_get_contents($filePath);

        if ($contents === false) {
            return null;
        }

        $namespace = null;
        $className = null;

        $tokens = token_get_all($contents);
        $count  = count($tokens);

        for ($i = 0; $i < $count; $i++) {
            if (! is_array($tokens[$i])) {
                continue;
            }

            if ($tokens[$i][0] === T_NAMESPACE) {
                // Collect namespace parts
                $ns = '';
                for ($j = $i + 1; $j < $count; $j++) {
                    if (is_array($tokens[$j]) && in_array($tokens[$j][0], [T_NAME_QUALIFIED, T_STRING, T_NS_SEPARATOR], true)) {
                        $ns .= $tokens[$j][1];
                    } elseif ($tokens[$j] === ';' || $tokens[$j] === '{') {
                        break;
                    }
                }

                $namespace = $ns;
            }

            if ($tokens[$i][0] === T_CLASS) {
                // Skip "class" keyword used as a constant (e.g. Foo::class)
                $prev = $i - 1;
                while ($prev >= 0 && is_array($tokens[$prev]) && $tokens[$prev][0] === T_WHITESPACE) {
                    $prev--;
                }

                if ($prev >= 0 && is_array($tokens[$prev]) && $tokens[$prev][0] === T_DOUBLE_COLON) {
                    continue;
                }

                // Find the class name token
                for ($j = $i + 1; $j < $count; $j++) {
                    if (is_array($tokens[$j]) && $tokens[$j][0] === T_STRING) {
                        $className = $tokens[$j][1];
                        break;
                    }
                }

                break;
            }
        }

        if ($className === null) {
            return null;
        }

        return $namespace !== null ? $namespace . '\\' . $className : $className;
    }

    /**
     * @param  class-string<Model>  $class
     * @return array<string, mixed>|null
     */
    private function inspectModel(string $class): ?array
    {
        try {
            $instance = new $class();
            $table    = $instance->getTable();

            return [
                'id'      => class_basename($class),
                'class'   => $class,
                'table'   => $table,
                'columns' => $this->getTableColumns($table),
            ];
        } catch (Throwable) {
            return null;
        }
    }

    /**
     * @return list<array{name: string, type: string, pk: bool, fk: bool}>
     */
    private function getTableColumns(string $table): array
    {
        try {
            $columns = Schema::getColumnListing($table);
            $result  = [];

            foreach ($columns as $column) {
                $result[] = [
                    'name' => $column,
                    'type' => Schema::getColumnType($table, $column),
                    'pk'   => $column === 'id',
                    'fk'   => str_ends_with((string) $column, '_id'),
                ];
            }

            return $result;
        } catch (Throwable) {
            return [];
        }
    }

    /**
     * @param class-string<Model> $class
     * @return list<array{name: string, type: string, related: class-string<Model>}>
     * @throws ReflectionException
     */
    private function detectRelationships(string $class): array
    {
        $relations  = [];
        $reflection = new ReflectionClass($class);

        foreach ($reflection->getMethods(ReflectionMethod::IS_PUBLIC) as $method) {
            // Skip methods declared in the Model base class itself
            if ($method->getDeclaringClass()->getName() === Model::class) {
                continue;
            }

            // Eloquent relation methods take no parameters
            if ($method->getNumberOfParameters() > 0) {
                continue;
            }

            $returnType = $method->getReturnType();

            if (! $returnType instanceof ReflectionNamedType) {
                continue;
            }

            $typeName = $returnType->getName();

            $isRelation = isset($this->relationTypeMap[$typeName])
                || (class_exists($typeName) && is_subclass_of($typeName, Relation::class));

            if (! $isRelation) {
                continue;
            }

            try {
                $instance    = new $class();
                $relationObj = $method->invoke($instance);

                $relations[] = [
                    'name'    => $method->getName(),
                    'type'    => $this->classifyRelation($relationObj),
                    'related' => $relationObj->getRelated()::class,
                ];
            } catch (Throwable) {
                // Model may require DB context; skip gracefully
            }
        }

        return $relations;
    }

    private function classifyRelation(Relation $relation): string
    {
        foreach ($this->relationTypeMap as $class => $label) {
            if ($relation instanceof $class) {
                return $label;
            }
        }

        return 'unknown';
    }
}
