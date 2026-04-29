<?php

use Bugo\FilamentErDiagram\Support\ModelInspector;
use Bugo\FilamentErDiagram\Tests\Fixtures\Models\Post;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Schema;

/**
 * Run the inspector against the test fixtures' directory.
 */
function scanFixtures(array $excluded = []): array
{
    $inspector = new ModelInspector($excluded);

    return $inspector->scan('tests/Fixtures/Models');
}

function invokeModelInspectorMethod(string $method, mixed ...$arguments): mixed
{
    $reflection = new ReflectionMethod(ModelInspector::class, $method);

    return $reflection->invokeArgs(new ModelInspector(), $arguments);
}

describe('scan() structure', function (): void {
    it('returns nodes and edges keys', function (): void {
        $result = scanFixtures();

        expect($result)->toBeValidDiagramData();
    });

    it('discovers all fixture models', function (): void {
        $result = scanFixtures();
        $ids    = array_column($result['nodes'], 'id');

        expect($ids)->toContain('User', 'Post', 'Comment');
    });

    it('excludes models listed in $excludedModels', function (): void {
        $result = scanFixtures(excluded: [Post::class]);
        $ids    = array_column($result['nodes'], 'id');

        expect($ids)
            ->toContain('User', 'Comment')
            ->not->toContain('Post');
    });

    it('returns empty result for a non-existent path', function (): void {
        $result = (new ModelInspector())->scan('non/existent/path');

        expect($result)->toBeValidDiagramData()
            ->and($result['nodes'])->toBeEmpty()
            ->and($result['edges'])->toBeEmpty();
    });

    it('resolves model paths from Laravel base_path()', function (): void {
        File::shouldReceive('isDirectory')
            ->once()
            ->with('base-only-models')
            ->andReturnFalse();

        File::shouldReceive('isDirectory')
            ->once()
            ->with(base_path('base-only-models'))
            ->andReturnTrue();

        expect(invokeModelInspectorMethod('resolvePath', 'base-only-models'))
            ->toBe(base_path('base-only-models'));
    });

    it('falls back to the current working directory for relative model paths', function (): void {
        $fallbackPath = getcwd() . DIRECTORY_SEPARATOR . 'cwd-only-models';

        File::shouldReceive('isDirectory')
            ->once()
            ->with('cwd-only-models')
            ->andReturnFalse();

        File::shouldReceive('isDirectory')
            ->once()
            ->with(base_path('cwd-only-models'))
            ->andReturnFalse();

        File::shouldReceive('isDirectory')
            ->once()
            ->with($fallbackPath)
            ->andReturnTrue();

        expect(invokeModelInspectorMethod('resolvePath', 'cwd-only-models'))
            ->toBe($fallbackPath);
    });
});

describe('Node structure', function (): void {
    it('every node has id, class, table and columns keys', function (): void {
        $result = scanFixtures();

        foreach ($result['nodes'] as $node) {
            expect($node)->toHaveKeys(['id', 'class', 'table', 'columns']);
        }
    });

    it('maps model class names to table names correctly', function (): void {
        $result  = scanFixtures();
        $nodeMap = collect($result['nodes'])->keyBy('id');

        expect($nodeMap['User']['table'])->toBe('users')
            ->and($nodeMap['Post']['table'])->toBe('posts')
            ->and($nodeMap['Comment']['table'])->toBe('comments');
    });

    it('detects primary key column as pk=true', function (): void {
        $result   = scanFixtures();
        $userNode = collect($result['nodes'])->firstWhere('id', 'User');
        $idCol    = collect($userNode['columns'])->firstWhere('name', 'id');

        expect($idCol['pk'])->toBeTrue();
    });

    it('marks _id suffix columns as fk=true', function (): void {
        $result    = scanFixtures();
        $postNode  = collect($result['nodes'])->firstWhere('id', 'Post');
        $userIdCol = collect($postNode['columns'])->firstWhere('name', 'user_id');

        expect($userIdCol['fk'])->toBeTrue()
            ->and($userIdCol['pk'])->toBeFalse();
    });

    it('populates column types from the schema', function (): void {
        $result   = scanFixtures();
        $userNode = collect($result['nodes'])->firstWhere('id', 'User');
        $nameCol  = collect($userNode['columns'])->firstWhere('name', 'name');

        expect($nameCol['type'])->toBeString()->not->toBeEmpty();
    });

    it('skips models that cannot be instantiated', function (): void {
        $result = (new ModelInspector())->scan('tests/Fixtures/EdgeCaseModels');
        $ids    = array_column($result['nodes'], 'id');

        expect($ids)
            ->toContain('EdgeCaseModel', 'RelatedEdgeModel')
            ->not->toContain('ExplodingModel');
    });

    it('returns empty columns when schema inspection fails', function (): void {
        $schema = Schema::getFacadeRoot();

        Schema::partialMock()
            ->shouldReceive('getColumnListing')
            ->once()
            ->with('broken_table')
            ->andThrow(new RuntimeException('Unable to inspect columns.'));

        try {
            expect(invokeModelInspectorMethod('getTableColumns', 'broken_table'))
                ->toBe([]);
        } finally {
            Schema::swap($schema);
        }
    });
});

describe('Edge structure', function (): void {
    it('every edge has source, target, type and name keys', function (): void {
        $result = scanFixtures();

        foreach ($result['edges'] as $edge) {
            expect($edge)->toHaveKeys(['source', 'target', 'type', 'name']);
        }
    });

    it('detects hasMany relationship from User to Post', function (): void {
        $result = scanFixtures();

        $edge = collect($result['edges'])->first(
            fn($e): bool => $e['source'] === 'User' && $e['target'] === 'Post',
        );

        expect($edge)->not->toBeNull()
            ->and($edge['type'])->toBe('hasMany')
            ->and($edge['name'])->toBe('posts');
    });

    it('detects belongsTo relationship from Post to User', function (): void {
        $result = scanFixtures();

        $edge = collect($result['edges'])->first(
            fn($e): bool => $e['source'] === 'Post' && $e['target'] === 'User',
        );

        expect($edge)->not->toBeNull()
            ->and($edge['type'])->toBe('belongsTo');
    });

    it('does not create edges for excluded models', function (): void {
        $result = scanFixtures(excluded: [Post::class]);

        $edgesInvolvingPost = collect($result['edges'])->filter(
            fn($e): bool => $e['source'] === 'Post' || $e['target'] === 'Post',
        );

        expect($edgesInvolvingPost)->toBeEmpty();
    });

    it('detects all relationships for Comment model', function (): void {
        $result       = scanFixtures();
        $commentEdges = collect($result['edges'])->where('source', 'Comment');

        expect($commentEdges)->toHaveCount(2); // belongsTo Post + belongsTo User
    });

    it('ignores public methods that cannot be inspected as relationships', function (): void {
        $result = (new ModelInspector())->scan('tests/Fixtures/EdgeCaseModels');
        $edges  = collect($result['edges'])->where('source', 'EdgeCaseModel');

        expect($edges)->toHaveCount(1)
            ->and($edges->first()['name'])->toBe('customRelation')
            ->and($edges->first()['target'])->toBe('RelatedEdgeModel')
            ->and($edges->first()['type'])->toBe('unknown');
    });
});

describe('Class resolver edge cases', function (): void {
    it('returns null when a PHP file cannot be read', function (): void {
        set_error_handler(static fn(int $severity, string $message): bool => true);

        try {
            $class = invokeModelInspectorMethod(
                'resolveClassFromFile',
                sys_get_temp_dir() . '/missing-er-diagram-model-' . uniqid() . '.php',
            );
        } finally {
            restore_error_handler();
        }

        expect($class)->toBeNull();
    });

    it('skips class constants while resolving the declared class name', function (): void {
        $path = tempnam(sys_get_temp_dir(), 'er-diagram-class-constant-');

        file_put_contents($path, <<<'PHP'
<?php

namespace Bugo\FilamentErDiagram\Tests\Fixtures\Parser;

$class = ReferencedModel::class;

class ParsedModel {}
PHP);

        try {
            expect(invokeModelInspectorMethod('resolveClassFromFile', $path))
                ->toBe('Bugo\FilamentErDiagram\Tests\Fixtures\Parser\ParsedModel');
        } finally {
            @unlink($path);
        }
    });

    it('returns null when a PHP file has no class declaration', function (): void {
        $path = tempnam(sys_get_temp_dir(), 'er-diagram-no-class-');

        file_put_contents($path, <<<'PHP'
<?php

return ReferencedModel::class;
PHP);

        try {
            expect(invokeModelInspectorMethod('resolveClassFromFile', $path))->toBeNull();
        } finally {
            @unlink($path);
        }
    });
});
