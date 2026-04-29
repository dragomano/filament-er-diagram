<?php

namespace Bugo\FilamentErDiagram\Commands {
    final class GenerateErDiagramCommandJsonEncoding
    {
        public static bool $shouldFail = false;
    }

    function json_encode(mixed $value, int $flags = 0, int $depth = 512): string|false
    {
        if (GenerateErDiagramCommandJsonEncoding::$shouldFail) {
            return false;
        }

        return \json_encode($value, $flags, $depth);
    }
}

namespace {
    use Bugo\FilamentErDiagram\Commands\GenerateErDiagramCommandJsonEncoding;
    use Bugo\FilamentErDiagram\Tests\Fixtures\Models\Post;
    use Illuminate\Support\Facades\Artisan;
    use Symfony\Component\Console\Command\Command;

    it('runs without error and outputs a table', function (): void {
        $this->artisan('er-diagram:generate', [
            '--path' => 'tests/Fixtures/Models',
        ])
            ->assertSuccessful()
            ->expectsOutputToContain('Model')
            ->expectsOutputToContain('Done.');
    });

    it('respects the --exclude option', function (): void {
        $this->artisan('er-diagram:generate', [
            '--path'    => 'tests/Fixtures/Models',
            '--exclude' => [Post::class],
        ])
            ->assertSuccessful()
            ->expectsOutputToContain('Done.');
    });

    it('prints clean JSON to stdout when JSON format is requested', function (): void {
        $exitCode = Artisan::call('er-diagram:generate', [
            '--path'   => 'tests/Fixtures/Models',
            '--format' => 'json',
        ]);

        $output = Artisan::output();
        $data = json_decode($output, true);

        expect($exitCode)->toBe(0)
            ->and($data)->toBeValidDiagramData()
            ->and($output)->not->toContain('Scanning')
            ->and($output)->not->toContain('Done.')
            ->and($output)->not->toContain('Outgoing relationships');
    });

    it('writes JSON to a file when --output is given', function (): void {
        $outputPath = sys_get_temp_dir() . '/er-diagram-test-' . uniqid() . '.json';

        $this->artisan('er-diagram:generate', [
            '--path'   => 'tests/Fixtures/Models',
            '--format' => 'json',
            '--output' => $outputPath,
        ])->assertSuccessful();

        expect(file_exists($outputPath))->toBeTrue();

        $data = json_decode(file_get_contents($outputPath), true);
        expect($data)->toBeValidDiagramData();

        @unlink($outputPath);
    });

    it('infers JSON format when writing to a file without an explicit format', function (): void {
        $outputPath = sys_get_temp_dir() . '/er-diagram-test-' . uniqid() . '.json';

        $this->artisan('er-diagram:generate', [
            '--path'   => 'tests/Fixtures/Models',
            '--output' => $outputPath,
        ])->assertSuccessful();

        expect(json_decode(file_get_contents($outputPath), true))->toBeValidDiagramData();

        @unlink($outputPath);
    });

    it('rejects table output written to a file', function (): void {
        $this->artisan('er-diagram:generate', [
            '--path'   => 'tests/Fixtures/Models',
            '--format' => 'table',
            '--output' => sys_get_temp_dir() . '/er-diagram-test-' . uniqid() . '.txt',
        ])->assertFailed();
    });

    it('fails gracefully for unknown format', function (): void {
        $this->artisan('er-diagram:generate', [
            '--path'   => 'tests/Fixtures/Models',
            '--format' => 'xml',
        ])->assertFailed();
    });

    it('fails gracefully when diagram data cannot be JSON encoded', function (): void {
        GenerateErDiagramCommandJsonEncoding::$shouldFail = true;

        try {
            $exitCode = Artisan::call('er-diagram:generate', [
                '--path'   => 'tests/Fixtures/Models',
                '--format' => 'json',
            ]);
        } finally {
            GenerateErDiagramCommandJsonEncoding::$shouldFail = false;
        }

        expect($exitCode)->toBe(Command::FAILURE)
            ->and(Artisan::output())->toContain('Unable to encode diagram data as JSON.');
    });

    it('fails gracefully when JSON output cannot be written', function (): void {
        $exitCode = Artisan::call('er-diagram:generate', [
            '--path'   => 'tests/Fixtures/Models',
            '--format' => 'json',
            '--output' => sys_get_temp_dir(),
        ]);

        expect($exitCode)->toBe(Command::FAILURE)
            ->and(Artisan::output())->toContain('Unable to write output to');
    });
}
