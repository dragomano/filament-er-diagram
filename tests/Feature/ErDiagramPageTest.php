<?php

declare(strict_types=1);

use Bugo\FilamentErDiagram\ErDiagramPlugin;
use Bugo\FilamentErDiagram\Pages\ErDiagramPage;
use Bugo\FilamentErDiagram\Tests\Fixtures\Models\Post;
use Filament\Actions\Action;
use Filament\Facades\Filament;
use Filament\Panel;

use function Livewire\store;

function registerErDiagramPageTestPanel(ErDiagramPlugin $plugin): Panel
{
    $panel = Panel::make()
        ->id('er-diagram-page-test')
        ->plugins([$plugin]);

    Filament::setCurrentPanel($panel);

    return $panel;
}

afterEach(function (): void {
    app('filament')->setCurrentPanel(null);
});

it('is registered by the plugin', function (): void {
    $panel = registerErDiagramPageTestPanel(ErDiagramPlugin::make());

    expect($panel->getPages())->toContain(ErDiagramPage::class);
});

it('uses plugin navigation configuration', function (): void {
    registerErDiagramPageTestPanel(
        ErDiagramPlugin::make()
            ->navigationGroup('Developer')
            ->navigationSort(15)
            ->navigationIcon('heroicon-o-table-cells'),
    );

    expect(ErDiagramPage::getNavigationIcon())->toBe('heroicon-o-table-cells')
        ->and(ErDiagramPage::getNavigationGroup())->toBe('Developer')
        ->and(ErDiagramPage::getNavigationSort())->toBe(15)
        ->and(ErDiagramPage::getNavigationLabel())->toBe('ER Diagram');
});

it('uses the package page view and translated title', function (): void {
    $page = new ErDiagramPage();

    expect($page->getView())->toBe('filament-er-diagram::pages.er-diagram')
        ->and($page->getTitle())->toBe('ER Diagram');
});

it('pluralizes diagram counter labels', function (): void {
    expect(trans_choice('filament-er-diagram::translations.models_count', 1, [], 'en'))->toBe('1 model')
        ->and(trans_choice('filament-er-diagram::translations.models_count', 2, [], 'en'))->toBe('2 models')
        ->and(trans_choice('filament-er-diagram::translations.models_count', 1, [], 'ru'))->toBe('1 модель')
        ->and(trans_choice('filament-er-diagram::translations.models_count', 14, [], 'ru'))->toBe('14 моделей')
        ->and(trans_choice('filament-er-diagram::translations.relationships_count', 21, [], 'ru'))->toBe('21 связь')
        ->and(trans_choice('filament-er-diagram::translations.relationships_count', 44, [], 'ru'))->toBe('44 связи');
});

it('builds localized diagram summaries on the server', function (): void {
    $previousLocale = app()->getLocale();

    app()->setLocale('ru');

    try {
        $summary = (new ErDiagramPage())->getDiagramSummary([
            'nodes' => [
                ['id' => 'User'],
                ['id' => 'Post'],
            ],
            'edges' => array_map(fn(): array => [
                'source' => 'User',
                'target' => 'Post',
            ], range(0, 43)),
        ]);
    } finally {
        app()->setLocale($previousLocale);
    }

    expect($summary['models'])->toBe('2 модели')
        ->and($summary['relationships'])->toBe('44 связи')
        ->and($summary['node_relationships']['User'])->toBe('44 связи');
});

it('returns diagram data from the configured plugin models path', function (): void {
    registerErDiagramPageTestPanel(
        ErDiagramPlugin::make()->modelsPath('tests/Fixtures/Models'),
    );

    $data = (new ErDiagramPage())->getDiagramData();
    $ids  = array_column($data['nodes'], 'id');

    expect($data)->toBeValidDiagramData()
        ->and($ids)->toContain('User', 'Post', 'Comment');
});

it('returns diagram payload with server-built summary data', function (): void {
    registerErDiagramPageTestPanel(
        ErDiagramPlugin::make()->modelsPath('tests/Fixtures/Models'),
    );

    $payload = (new ErDiagramPage())->getDiagramPayload();

    expect($payload['data'])->toBeValidDiagramData()
        ->and($payload['summary'])->toHaveKeys(['models', 'relationships', 'node_relationships'])
        ->and($payload['summary']['models'])->toBe('3 models')
        ->and($payload['summary']['relationships'])->toBe('6 relationships')
        ->and($payload['summary']['node_relationships'])->toHaveKeys(['User', 'Post', 'Comment']);
});

it('passes excluded models from the plugin to the model inspector', function (): void {
    registerErDiagramPageTestPanel(
        ErDiagramPlugin::make()
            ->modelsPath('tests/Fixtures/Models')
            ->excludeModels([Post::class]),
    );

    $data = (new ErDiagramPage())->getDiagramData();
    $ids  = array_column($data['nodes'], 'id');

    expect($ids)
        ->toContain('User', 'Comment')
        ->not->toContain('Post');
});

it('defines the expected header actions', function (): void {
    $page = new class extends ErDiagramPage {
        public function exposedHeaderActions(): array
        {
            return $this->getHeaderActions();
        }
    };

    $actions = $page->exposedHeaderActions();
    $actions = collect($actions)->keyBy(fn($action): string => $action->getName());

    expect($actions->keys()->all())->toBe(['export_svg', 'export_png', 'refresh'])
        ->and($actions['export_svg']->getLabel())->toBe('Export SVG')
        ->and($actions['export_svg']->getAlpineClickHandler())->toBe("\$dispatch('er:export-svg')")
        ->and($actions['export_png']->getLabel())->toBe('Export PNG')
        ->and($actions['export_png']->getAlpineClickHandler())->toBe("\$dispatch('er:export-png')")
        ->and($actions['refresh']->getLabel())->toBe('Refresh');
});

it('dispatches refreshed diagram data from the refresh header action', function (): void {
    registerErDiagramPageTestPanel(
        ErDiagramPlugin::make()->modelsPath('tests/Fixtures/Models'),
    );

    $page = new class extends ErDiagramPage {
        public function exposedHeaderActions(): array
        {
            return $this->getHeaderActions();
        }
    };

    /** @var Action $refreshAction */
    $refreshAction = collect($page->exposedHeaderActions())
        ->first(fn($action): bool => $action->getName() === 'refresh');

    $refreshAction->call();

    $event = collect(store($page)->get('dispatched', []))
        ->map(fn($event): array => $event->serialize())
        ->firstWhere('name', 'er-diagram-refreshed');

    expect($event)->not->toBeNull()
        ->and($event['params']['data'])->toBeValidDiagramData()
        ->and($event['params']['summary'])->toHaveKeys(['models', 'relationships', 'node_relationships'])
        ->and(store($page)->get('skipRender'))->toBeTrue();
});
