const querystring = require('querystring');
const createClient = require('@supabase/supabase-js');

const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY)


exports.handler = async function(event, context) {
    return {
        statusCode: 200,
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(querystring.decode(event.body))
    };
}
