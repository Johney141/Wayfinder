require('dotenv').config();
const { searchClient } = require('@algolia/client-search');
const { Organization, Articles } = require('../../db/models');

// Initialize Algolia client with your credentials
const client = searchClient(process.env.ALGOLIA_APP_ID, process.env.ALGOLIA_WRITE_API_KEY);

// Now you can proceed with uploading your data as you intended.
  // Correct initialization

/**
 * Upload data for a specific organization to Algolia.
 * @param {number} orgId - Organization ID to filter data.
 * @returns {Promise<void>}
 */
async function uploadOrgDataToAlgolia(orgId) {
    try {
        // Get all articles for the given orgId
        const articles = await Articles.findAll({
            where: { orgId: orgId }
        });

        // Check if articles were found
        if (articles.length === 0) {
            console.log(`No articles found for organization: ${orgId}`);
            return;
        }

        // Format data for Algolia
        const formattedArticles = articles.map(article => ({
            objectID: article.id,  // Use the article ID as the objectID
            title: article.title,
            body: article.body,
            plainText: article.plainText,
            orgId: article.orgId,
            userId: article.userId
        }));

        // Dynamically create an index name based on orgId
        const indexName = `org_${orgId}_articles`;

        // Upload data to Algolia using saveObjects method
        await client.saveObjects({
            indexName: indexName,
            objects: formattedArticles
        });

        console.log(`Data uploaded successfully to index: ${indexName}`);
    } catch (err) {
        console.error('Error uploading data to Algolia:', err);
    }
}

const uploadAllOrgData = async () => {
    try {
        // Fetch all organizations
        const organizations = await Organization.findAll();

        for (const org of organizations) {
            console.log(`Uploading articles for organization: ${org.id}`);
            await uploadOrgDataToAlgolia(org.id); // Call with org.id only
        }

        console.log('All organization articles have been uploaded to Algolia.');
    } catch (error) {
        console.error('Error uploading all organization data:', error);
    }
};

// console.log('DEBUG HERE: ', client)

// Call the function when needed
uploadAllOrgData();

module.exports = { uploadOrgDataToAlgolia, client };
