<?php

// config/filament-er-diagram.php
// All options here are overridable at runtime via the plugin's fluent API.

return [

    /*
    |--------------------------------------------------------------------------
    | Models path
    |--------------------------------------------------------------------------
    | Relative to base_path(). The inspector recursively scans this directory
    | for Eloquent Model classes.
    */
    'models_path' => 'app/Models',

    /*
    |--------------------------------------------------------------------------
    | Excluded models
    |--------------------------------------------------------------------------
    | Fully-qualified class names of models that should never appear in the
    | diagram, e.g. internal pivot/log models you don't want to expose.
    */
    'excluded_models' => [
        // App\Models\PersonalAccessToken::class,
    ],

    /*
    |--------------------------------------------------------------------------
    | Show table columns
    |--------------------------------------------------------------------------
    | When false the nodes only show the model name and table name, without
    | the list of database columns. Useful for very large schemas.
    */
    'show_columns' => true,

    /*
    |--------------------------------------------------------------------------
    | Show relationship labels
    |--------------------------------------------------------------------------
    | When false the edge labels (method names) are hidden to reduce visual
    | noise on dense diagrams.
    */
    'show_relationship_labels' => true,

];
