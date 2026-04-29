<?php

namespace Bugo\FilamentErDiagram;

use Bugo\FilamentErDiagram\Pages\ErDiagramPage;
use Filament\Contracts\Plugin;
use Filament\Panel;
use Illuminate\Database\Eloquent\Model;

class ErDiagramPlugin implements Plugin
{
    protected string $modelsPath = 'app/Models';

    /** @var class-string<Model>[] */
    protected array $excludedModels = [];

    protected bool $showColumns = true;

    protected bool $showRelationshipLabels = true;

    protected ?string $navigationGroup = 'Tools';

    protected ?int $navigationSort = 100;

    protected ?string $navigationIcon = 'heroicon-o-circle-stack';

    public static function make(): static
    {
        return app(static::class);
    }

    public static function get(): static
    {
        $filament     = app('filament');
        $currentPanel = $filament->getCurrentPanel();
        $getPlugin    = static fn(Panel $panel): static => $panel->getPlugin('er-diagram');

        if ($currentPanel !== null && $currentPanel->hasPlugin('er-diagram')) {
            return $getPlugin($currentPanel);
        }

        foreach ($filament->getPanels() as $panel) {
            if ($panel->hasPlugin('er-diagram')) {
                return $getPlugin($panel);
            }
        }

        return filament('er-diagram');
    }

    public function getId(): string
    {
        return 'er-diagram';
    }

    public function register(Panel $panel): void
    {
        $panel->pages([ErDiagramPage::class]);
    }

    public function boot(Panel $panel): void
    {
        //
    }

    public function modelsPath(string $path): static
    {
        $this->modelsPath = $path;

        return $this;
    }

    /**
     * @param  class-string<Model>[]  $models
     */
    public function excludeModels(array $models): static
    {
        $this->excludedModels = $models;

        return $this;
    }

    public function withoutColumns(): static
    {
        $this->showColumns = false;

        return $this;
    }

    public function withoutRelationshipLabels(): static
    {
        $this->showRelationshipLabels = false;

        return $this;
    }

    public function navigationGroup(?string $group): static
    {
        $this->navigationGroup = $group;

        return $this;
    }

    public function navigationSort(int $sort): static
    {
        $this->navigationSort = $sort;

        return $this;
    }

    public function navigationIcon(string $icon): static
    {
        $this->navigationIcon = $icon;

        return $this;
    }

    public function getModelsPath(): string
    {
        return $this->modelsPath;
    }

    /** @return class-string<Model>[] */
    public function getExcludedModels(): array
    {
        return $this->excludedModels;
    }

    public function shouldShowColumns(): bool
    {
        return $this->showColumns;
    }

    public function shouldShowRelationshipLabels(): bool
    {
        return $this->showRelationshipLabels;
    }

    public function getNavigationGroup(): ?string
    {
        return $this->navigationGroup;
    }

    public function getNavigationSort(): ?int
    {
        return $this->navigationSort;
    }

    public function getNavigationIcon(): string
    {
        return $this->navigationIcon ?? 'heroicon-o-circle-stack';
    }
}
