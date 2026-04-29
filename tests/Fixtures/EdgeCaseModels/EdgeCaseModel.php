<?php

namespace Bugo\FilamentErDiagram\Tests\Fixtures\EdgeCaseModels;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use RuntimeException;

class EdgeCaseModel extends Model
{
    protected $table = 'edge_case_models';

    public function customRelation(): UnknownRelation
    {
        return new UnknownRelation((new RelatedEdgeModel())->newQuery(), $this);
    }

    public function brokenRelation(): HasMany
    {
        throw new RuntimeException('This relation cannot be inspected.');
    }

    public function relationWithParameter(int $id): HasMany
    {
        return $this->hasMany(RelatedEdgeModel::class);
    }

    public function relationWithoutReturnType()
    {
        return $this->hasMany(RelatedEdgeModel::class);
    }

    public function scalarReturn(): string
    {
        return 'not a relation';
    }
}
