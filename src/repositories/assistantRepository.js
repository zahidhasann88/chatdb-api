const openAiRepository = require('./openAiRepository');
const sqlHelperRepository = require('./sqlHelperRepository');

class AssistantRepository {

    async getAssistantFromOpenAi(prompt) {
        prompt = prompt.trim().toLowerCase();
        if (!prompt) {
            return null;
        } else {
            const p = `I have the tables: 
                categories(category_id, category_name, description, picture)
                customer_customer_demo(customer_id, customer_type_id)
                customer_demographics(customer_type_id, customer_desc)
                customers(customer_id, company_name, contact_name, contact_title, address, city, region, postal_code, country, phone, fax)
                employee_territories(employee_id, territory_id)
                employees(employee_id, last_name, first_name, title, title_of_courtesy, birth_date, hire_date, address, city, region, postal_code, country, home_phone, "extension", photo, notes, reports_to, photo_path)
                order_details(order_id, product_id, unit_price, quantity, discount)
                orders(order_id, customer_id, employee_id, order_date, required_date, shipped_date, ship_via, freight, ship_name, ship_address, ship_city, ship_region, ship_postal_code, ship_country)
                products(product_id, product_name, supplier_id, category_id, quantity_per_unit, unit_price, units_in_stock, units_on_order, reorder_level, discontinued)
                region(region_id, region_description) shippers(shipper_id, company_name, phone)
                suppliers(supplier_id, company_name, contact_name, contact_title, address, city, region, postal_code, country, phone, fax, homepage)
                territories(territory_id, territory_description, region_id)
                us_states(state_id, state_name, state_abbr, state_region).
                Generate SQL for PostgreSQL and finish it wih semicolon. If you have to query for a string, check for the lower case from database. If you cannot generate query, return the text: Please give me more specific information.`
            prompt = p + prompt;
        }
        try {
            const assistantReply = await openAiRepository.getResponseFromOpenAi(prompt);
            // console.log('assistantReply: ', assistantReply);
            const startIndex = assistantReply.trim().replace(/\n/g, ' ').indexOf("SELECT");
            const endIndex = assistantReply.trim().replace(/\n/g, ' ').indexOf(";", startIndex);
            const isValidQuery = startIndex !== -1 && endIndex !== -1;
            if (isValidQuery) {
                const queryString = assistantReply.substring(startIndex, endIndex);
                const results = await sqlHelperRepository.executeSQLQuery(queryString);
                return results;
                // const p2 = `I have this result:
                // ${JSON.stringify(results)}
                // Now format and beautify the result as bullet point and show it to user.`;
                // const assistantReply2 = await openAiRepository.getResponseFromOpenAi(p2);
                // return assistantReply2;
            } else {
                console.error('Not a valid sql query: ', assistantReply);
                return assistantReply;
            }
        } catch (error) {
            console.error('Error generating query response:', error);
            throw error;
        }
    }
}

module.exports = new AssistantRepository();
