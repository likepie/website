const querystring = require('querystring');
const { createClient } = require('@supabase/supabase-js');
const { v4: uuidv4 } = require('uuid');

const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY)

exports.handler = async function(event, context) {
    const input = querystring.decode(event.body);
    const { data, error } = await supabase
        .from('polls')
        .insert([
            {
                id: uuidv4(), 
                question: 'Hello world', 
                options: input
            }
        ]);
    
    if (error) {
        return {
            statusCode: 200,
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(error)
        };
    }
    
    return {
        statusCode: 200,
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(querystring.decode(event.body))
    };
}
