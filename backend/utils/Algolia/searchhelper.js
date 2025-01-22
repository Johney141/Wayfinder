const algoliasearch = require('algoliasearch');

// Initialize Algolia client
const client = algoliasearch(process.env.ALGOLIA_APP_ID, process.env.ALGOLIA_SEARCH_API_KEY);

/**
 * Perform a search for a specific organization.
 * @param {string} query - Search query.
 * @param {number} orgId - Organization ID to filter data.
 */
async function searchOrgArticles(query, orgId) {
    const index = client.initIndex(`org_${orgId}_articles`);

    try {
        const results = await index.search(query);
        
    } catch (err) {
        console.error('Error performing search:', err);
    }
}

module.exports = { searchOrgArticles };
