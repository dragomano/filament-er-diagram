<?php

namespace Bugo\FilamentErDiagram\Tests\Fixtures\EdgeCaseModels;

use Illuminate\Database\Eloquent\Collection as EloquentCollection;
use Illuminate\Database\Eloquent\Relations\Relation;

class UnknownRelation extends Relation
{
    public function addConstraints(): void {}

    public function addEagerConstraints(array $models): void {}

    public function initRelation(array $models, $relation): array
    {
        return $models;
    }

    public function match(array $models, EloquentCollection $results, $relation): array
    {
        return $models;
    }

    public function getResults(): EloquentCollection
    {
        return $this->related->newCollection();
    }
}
