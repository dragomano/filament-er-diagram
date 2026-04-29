<?php

declare(strict_types=1);

use Bugo\FilamentErDiagram\Tests\TestCase;

uses(TestCase::class)->in(__DIR__);

/*
|--------------------------------------------------------------------------
| Custom expectations
|--------------------------------------------------------------------------
*/

expect()->extend('toBeValidDiagramData', fn() => $this
    ->toBeArray()
    ->toHaveKeys(['nodes', 'edges'])
    ->and($this->value['nodes'])->toBeArray()
    ->and($this->value['edges'])->toBeArray());
