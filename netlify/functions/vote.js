const querystring = require('querystring');
const { createClient } = require('@supabase/supabase-js');
const { v4: uuidv4 } = require('uuid');

const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY)

exports.handler = async function(event, context) {
    const input = querystring.decode(event.body);
    
    // @todo validate input:
    // - question must not be empty and maybe add an arbitrary size limit
    // - options must be an array of at least two items and no more than twenty
    
    const record = {
        id: uuidv4(),
        question: input.question,
        options: input.options
    };
    
    const { data, error } = await supabase
        .from('polls')
        .insert([record]);
    
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
        body: JSON.stringify(record)
    };
}
