<?php

declare(strict_types=1);

namespace Bugo\FilamentErDiagram\Tests\Fixtures\EdgeCaseModels;

use Illuminate\Database\Eloquent\Model;
use RuntimeException;

class ExplodingModel extends Model
{
    public function __construct()
    {
        throw new RuntimeException('This model cannot be instantiated.');
    }
}
