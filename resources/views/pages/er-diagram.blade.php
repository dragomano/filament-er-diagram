@php
    use Filament\Support\Facades\FilamentAsset;

    $diagramPayload = $this->getDiagramPayload();
    $diagramId = 'filament-er-diagram-svg';
    $diagramStatusId = 'filament-er-diagram-status';
    $diagramSearchId = 'filament-er-diagram-search';
@endphp
<x-filament-panels::page>
    <div
        x-load
        x-load-src="{{ FilamentAsset::getAlpineComponentSrc('er-diagram', package: 'bugo/filament-er-diagram') }}"
        x-data="erDiagram(@js($diagramPayload), @js([
            'highlight_connections_hint' => __('filament-er-diagram::translations.highlight_connections_hint'),
            'search_status' => __('filament-er-diagram::translations.search_status'),
            'model_node_label' => __('filament-er-diagram::translations.model_node_label'),
            'primary_key' => __('filament-er-diagram::translations.primary_key'),
            'foreign_key' => __('filament-er-diagram::translations.foreign_key'),
            'no_columns' => __('filament-er-diagram::translations.no_columns'),
        ]))"
        x-init="$nextTick(() => init($refs.svg))"
        x-on:er:export-svg.window="exportSvg($refs.svg)"
        x-on:er:export-png.window="exportPng($refs.svg)"
        x-on:er:search.window="search($event.detail.q)"
        x-on:er-diagram-refreshed.window="refresh($event.detail)"
    >

        <div class="flex flex-wrap items-center gap-3 mb-4">
            <x-filament::input.wrapper class="w-64">
                <x-filament::input
                    id="{{ $diagramSearchId }}"
                    type="search"
                    autocomplete="off"
                    aria-label="{{ __('filament-er-diagram::translations.search_label') }}"
                    aria-controls="{{ $diagramId }}"
                    placeholder="{{ __('filament-er-diagram::translations.search_placeholder') }}"
                    x-on:input="$dispatch('er:search', { q: $event.target.value })"
                />
            </x-filament::input.wrapper>

            <div
                class="flex items-center gap-1 ml-auto"
                role="toolbar"
                aria-label="{{ __('filament-er-diagram::translations.zoom_controls_label') }}"
                aria-controls="{{ $diagramId }}"
            >
                <x-filament::button
                    color="gray"
                    size="sm"
                    aria-label="{{ __('filament-er-diagram::translations.zoom_in') }}"
                    title="{{ __('filament-er-diagram::translations.zoom_in') }}"
                    x-on:click="erZoom(1.4)"
                >
                    +
                </x-filament::button>

                <x-filament::button
                    color="gray"
                    size="sm"
                    aria-label="{{ __('filament-er-diagram::translations.zoom_fit_label') }}"
                    title="{{ __('filament-er-diagram::translations.zoom_fit_label') }}"
                    x-on:click="erZoomReset()"
                >
                    {{ __('filament-er-diagram::translations.zoom_fit') }}
                </x-filament::button>

                <x-filament::button
                    color="gray"
                    size="sm"
                    aria-label="{{ __('filament-er-diagram::translations.zoom_out') }}"
                    title="{{ __('filament-er-diagram::translations.zoom_out') }}"
                    x-on:click="erZoom(0.7)"
                >
                    −
                </x-filament::button>
            </div>

            <div
                class="flex flex-wrap items-center gap-4 text-xs text-gray-500 dark:text-gray-400 border-l pl-4"
                role="list"
                aria-label="{{ __('filament-er-diagram::translations.legend_label') }}"
            >
                <span class="flex items-center gap-1.5" role="listitem">
                    <span class="inline-block w-5 h-0.5 bg-blue-500 rounded" aria-hidden="true"></span>
                    <span>hasMany</span>
                </span>
                <span class="flex items-center gap-1.5" role="listitem">
                    <span class="inline-block w-5 border-t border-dashed border-gray-400" aria-hidden="true"></span>
                    <span>belongsTo</span>
                </span>
                <span class="flex items-center gap-1.5" role="listitem">
                    <span class="inline-block w-5 h-0.5 bg-green-500 rounded" aria-hidden="true"></span>
                    <span>hasOne</span>
                </span>
                <span class="flex items-center gap-1.5" role="listitem">
                    <span class="inline-block w-5 h-0.5 bg-purple-400 rounded" aria-hidden="true"></span>
                    <span>many:many</span>
                </span>
            </div>
        </div>

        <div
            class="relative w-full rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden bg-gray-50 dark:bg-gray-900"
            style="height: 70vh;"
            role="region"
            aria-label="{{ __('filament-er-diagram::translations.diagram_region_label') }}"
            aria-describedby="{{ $diagramStatusId }}"
        >
            <svg
                id="{{ $diagramId }}"
                wire:ignore
                x-ref="svg"
                class="w-full h-full"
                style="cursor: grab;"
                role="group"
                aria-label="{{ __('filament-er-diagram::translations.diagram_region_label') }}"
                aria-describedby="{{ $diagramStatusId }}"
            >
                <defs aria-hidden="true">
                    <pattern
                        id="er-grid"
                        width="24"
                        height="24"
                        patternUnits="userSpaceOnUse"
                    >
                        <path
                            d="M 24 0 L 0 0 0 24"
                            fill="none"
                            class="stroke-gray-200 dark:stroke-gray-700"
                            stroke-width="0.5"
                        />
                    </pattern>
                    <marker
                        id="m-hasmany"
                        viewBox="0 0 10 10"
                        refX="9"
                        refY="5"
                        markerWidth="6"
                        markerHeight="6"
                        orient="auto"
                    >
                        <path
                            d="M2 1L9 5L2 9"
                            fill="none"
                            stroke="#3b82f6"
                            stroke-width="1.5"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                        />
                    </marker>
                    <marker
                        id="m-hasone"
                        viewBox="0 0 10 10"
                        refX="9"
                        refY="5"
                        markerWidth="6"
                        markerHeight="6"
                        orient="auto"
                    >
                        <path
                            d="M2 1L9 5L2 9"
                            fill="none"
                            stroke="#22c55e"
                            stroke-width="1.5"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                        />
                    </marker>
                    <marker
                        id="m-belongsto"
                        viewBox="0 0 10 10"
                        refX="9"
                        refY="5"
                        markerWidth="6"
                        markerHeight="6"
                        orient="auto"
                    >
                        <path
                            d="M2 1L9 5L2 9"
                            fill="none"
                            stroke="#9ca3af"
                            stroke-width="1.5"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                        />
                    </marker>
                    <marker
                        id="m-manymany"
                        viewBox="0 0 14 10"
                        refX="13"
                        refY="5"
                        markerWidth="8"
                        markerHeight="8"
                        orient="auto"
                    >
                        <path
                            d="M2 1L9 5L2 9M5 1L12 5L5 9"
                            fill="none"
                            stroke="#a855f7"
                            stroke-width="1.5"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                        />
                    </marker>
                </defs>

                <rect width="100%" height="100%" fill="url(#er-grid)" aria-hidden="true"/>
                <g id="er-g"></g>
            </svg>

            <div
                id="{{ $diagramStatusId }}"
                class="absolute bottom-0 inset-x-0 flex items-center gap-4 px-4 py-2
                        text-xs text-gray-400 border-t border-gray-200 dark:border-gray-700
                        bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm"
                role="status"
                aria-live="polite"
                aria-atomic="true"
            >
                <span x-text="summary.models"></span>
                <span aria-hidden="true">·</span>
                <span x-text="summary.relationships"></span>
                <span aria-hidden="true">·</span>
                <span x-text="statusMsg"></span>
            </div>
        </div>

    </div>
</x-filament-panels::page>
