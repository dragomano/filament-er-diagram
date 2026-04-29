<?php

namespace Bugo\FilamentErDiagram\Pages;

use Bugo\FilamentErDiagram\ErDiagramPlugin;
use Bugo\FilamentErDiagram\Support\ModelInspector;
use Filament\Actions\Action;
use Filament\Pages\Page;
use Illuminate\Contracts\Support\Htmlable;
use ReflectionException;

class ErDiagramPage extends Page
{
    protected string $view = 'filament-er-diagram::pages.er-diagram';

    public static function getNavigationIcon(): string|Htmlable|null
    {
        return ErDiagramPlugin::get()->getNavigationIcon();
    }

    public static function getNavigationLabel(): string
    {
        return __('filament-er-diagram::translations.navigation_label');
    }

    public static function getNavigationGroup(): ?string
    {
        return ErDiagramPlugin::get()->getNavigationGroup();
    }

    public static function getNavigationSort(): ?int
    {
        return ErDiagramPlugin::get()->getNavigationSort();
    }

    public function getTitle(): string|Htmlable
    {
        return __('filament-er-diagram::translations.page_title');
    }

    /**
     * Called from the Blade view to supply diagram JSON to the Alpine component.
     *
     * @return array{nodes: list<array<string,mixed>>, edges: list<array<string,string>>}
     *
     * @throws ReflectionException
     */
    public function getDiagramData(): array
    {
        $plugin    = ErDiagramPlugin::get();
        $inspector = new ModelInspector($plugin->getExcludedModels());

        return $inspector->scan($plugin->getModelsPath());
    }

    /**
     * @return array{
     *     data: array{nodes: list<array<string,mixed>>, edges: list<array<string,string>>},
     *     summary: array{models: string, relationships: string, node_relationships: array<string,string>}
     * }
     *
     * @throws ReflectionException
     */
    public function getDiagramPayload(): array
    {
        $data = $this->getDiagramData();

        return [
            'data'    => $data,
            'summary' => $this->getDiagramSummary($data),
        ];
    }

    /**
     * @param  array{nodes: list<array<string,mixed>>, edges: list<array<string,string>>}  $data
     * @return array{models: string, relationships: string, node_relationships: array<string,string>}
     */
    public function getDiagramSummary(array $data): array
    {
        $nodeRelationshipCounts = array_fill_keys(array_column($data['nodes'], 'id'), 0);

        foreach ($data['edges'] as $edge) {
            $source = $edge['source'] ?? null;
            $target = $edge['target'] ?? null;

            if (is_string($source) && array_key_exists($source, $nodeRelationshipCounts)) {
                $nodeRelationshipCounts[$source]++;
            }

            if ($target !== $source && is_string($target) && array_key_exists($target, $nodeRelationshipCounts)) {
                $nodeRelationshipCounts[$target]++;
            }
        }

        $nodeRelationships = array_map(fn(int $count): string => trans_choice(
            'filament-er-diagram::translations.relationships_count',
            $count,
        ), $nodeRelationshipCounts);

        return [
            'models'             => trans_choice('filament-er-diagram::translations.models_count', count($data['nodes'])),
            'relationships'      => trans_choice('filament-er-diagram::translations.relationships_count', count($data['edges'])),
            'node_relationships' => $nodeRelationships,
        ];
    }

    protected function getHeaderActions(): array
    {
        return [
            Action::make('export_svg')
                ->label(__('filament-er-diagram::translations.export_svg'))
                ->icon('heroicon-o-arrow-down-tray')
                ->color('gray')
                ->alpineClickHandler("\$dispatch('er:export-svg')"),

            Action::make('export_png')
                ->label(__('filament-er-diagram::translations.export_png'))
                ->icon('heroicon-o-photo')
                ->color('gray')
                ->alpineClickHandler("\$dispatch('er:export-png')"),

            Action::make('refresh')
                ->label(__('filament-er-diagram::translations.refresh'))
                ->icon('heroicon-o-arrow-path')
                ->color('gray')
                ->action(function (): void {
                    $payload = $this->getDiagramPayload();

                    $this->dispatch(
                        'er-diagram-refreshed',
                        data: $payload['data'],
                        summary: $payload['summary'],
                    );
                    $this->skipRender();
                }),
        ];
    }
}
