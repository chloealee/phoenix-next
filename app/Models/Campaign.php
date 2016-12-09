<?php

namespace App\Models;

use Contentful\Delivery\Query;
use Illuminate\Database\Eloquent\ModelNotFoundException;

class Campaign
{
    /**
     * Get all campaigns.
     *
     * @return \Illuminate\Support\Collection
     */
    public static function getAll()
    {
        $client = static::getClient();

        $query = (new Query)->setContentType('campaign');

        return collect(iterator_to_array($client->getEntries($query)));
    }

    /**
     * Find a campaign by its slug.
     *
     * @param  string $slug
     * @return \Contentful\Delivery\DynamicEntry
     * @throws \Illuminate\Database\Eloquent\ModelNotFoundException
     */
    public static function findBySlug($slug)
    {
        $client = static::getClient();

        $query = (new Query)
            ->setContentType('campaign')
            ->where('fields.slug', $slug)
            ->setLimit(1);

        $campaigns = $client->getEntries($query);
        if (! $campaigns->count()) {
            throw new ModelNotFoundException;
        }

        $campaign = $campaigns[0];
        $campaign->setLocale(app()->getLocale());

        return $campaign;
    }

    /**
     * Get instance of the Contentful delivery client.
     *
     * @return \Contentful\Delivery\Client
     */
    public static function getClient()
    {
        return app('contentful.delivery');
    }

    /**
     * Determine if the specified campaign is active.
     *
     * @param  \Contentful\Delivery\DynamicEntry  $campaign
     * @return boolean
     */
    public static function isActive($campaign)
    {
        return $campaign->getActive();
    }
}
