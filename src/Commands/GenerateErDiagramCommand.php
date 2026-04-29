<?php

namespace Bugo\FilamentErDiagram\Commands;

use Bugo\FilamentErDiagram\Support\ModelInspector;
use Illuminate\Console\Command;
use ReflectionException;

class GenerateErDiagramCommand extends Command
{
    protected $signature = 'er-diagram:generate
                            {--path=app/Models : Directory to scan for Eloquent models}
                            {--exclude=* : Fully-qualified model class names to exclude}
                            {--format=table : Output format (table, json)}
                            {--output= : File path to write JSON output into (optional)}';

    protected $description = 'Generate an ER diagram from Eloquent models and print or save it';

    /**
     * @throws ReflectionException
     */
    public function handle(): int
    {
        $path     = (string) $this->option('path');
        $format   = strtolower((string) $this->option('format'));
        $output   = $this->option('output');
        $excluded = (array) $this->option('exclude');

        if ($output && ! $this->input->hasParameterOption('--format')) {
            $format = 'json';
        }

        if (! in_array($format, ['table', 'json'], true)) {
            $this->error("Unknown format \"[$format]\". Supported: table, json");

            return self::FAILURE;
        }

        if ($output && $format !== 'json') {
            $this->error('The --output option is only supported with --format=json.');

            return self::FAILURE;
        }

        if ($format === 'table') {
            return $this->renderTable($path, $excluded);
        }

        return $this->renderJson($path, $excluded, $output ? (string) $output : null);
    }

    /**
     * @param  string[]  $excluded
     *
     * @throws ReflectionException
     */
    private function renderTable(string $path, array $excluded): int
    {
        $this->info("Scanning <comment>$path</comment>…");

        $inspector = new ModelInspector($excluded);
        $data      = $inspector->scan($path);

        $this->newLine();
        $this->table(
            headers: ['Model', 'Table', 'Columns', 'Outgoing relationships'],
            rows: collect($data['nodes'])->map(fn(array $n): array => [
                $n['id'],
                $n['table'],
                count($n['columns']),
                collect($data['edges'])
                    ->where('source', $n['id'])
                    ->map(fn(array $e): string => "{$e['name']} ({$e['type']})")
                    ->implode(', '),
            ]),
        );

        $this->newLine();
        $this->info($this->summary($data));

        return self::SUCCESS;
    }

    /**
     * @param  string[]  $excluded
     *
     * @throws ReflectionException
     */
    private function renderJson(string $path, array $excluded, ?string $output): int
    {
        $inspector = new ModelInspector($excluded);
        $data      = $inspector->scan($path);
        $content   = json_encode($data, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE);

        if (! is_string($content)) {
            $this->error('Unable to encode diagram data as JSON.');

            return self::FAILURE;
        }

        if ($output === null) {
            $this->line($content);

            return self::SUCCESS;
        }

        if (@file_put_contents($output, $content) === false) {
            $this->error("Unable to write output to <comment>$output</comment>.");

            return self::FAILURE;
        }

        $this->info("Written to <comment>$output</comment>");

        $this->newLine();
        $this->info($this->summary($data));

        return self::SUCCESS;
    }

    /**
     * @param  array{nodes: list<array<string,mixed>>, edges: list<array<string,string>>}  $data
     */
    private function summary(array $data): string
    {
        return sprintf(
            'Done. <comment>%d</comment> model(s) · <comment>%d</comment> relationship(s).',
            count($data['nodes']),
            count($data['edges']),
        );
    }
}
