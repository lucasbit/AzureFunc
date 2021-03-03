const fetch = require("node-fetch");
module.exports = async function (context, req) {
    context.log('JavaScript HTTP trigger function processed a request.');

    const name = (req.query.name || (req.body && req.body.name));
    const responseMessage = name
        ? "Hello, " + name + ". This HTTP triggered function executed successfully."
        : "This HTTP triggered function executed successfully. Pass a name in the query string or in the request body for a personalized response.";
       
   

        const azurePayLoad = {
            "resources": {
                "repositories": {
                    "self": {
                        "refName": "refs/heads/branchname"
                    }
                }
            },
            "test":"Test text from body"
        };
     

        try {
            await fetch( 
                "https://dev.azure.com/lukaszlinka0478/lab15-PartsUnlimited/_apis/pipelines/10/runs?api-version=6.1-preview.1", 
                { 
                  method: 'POST', 
                  body: JSON.stringify(azurePayLoad),
                  headers: { 
                    'Content-Type': 'application/json', 
                    'Authorization': process.env.adoToken
                  }, 
                },
              ); 
            
        } catch (error) {
            context.log(error)
        }

        // https://dev.to/zegami/writing-an-azure-function-in-node-js-to-implement-a-webhook-2a52
             // const signupBody = {
        //     "userName":  "Trillian",
        //     "firstName": "Tricia",
        //     "lastName":  "McMillan",
        //     "from test": process.env.test_value
        //   };
           // //   "Authorization", "Basic dWxmNGg2c2h1MzdpMm01dzJ1ZXFhNGczaWdxYmVyNm9rc");
        // try {
        //     await fetch( 
        //         "https://webhook.site/461c0549-0723-43a3-820c-968be6ffcb9a", 
        //         { 
        //           method: 'POST', 
        //           body: JSON.stringify(signupBody),
        //           headers: { 
        //             'Content-Type': 'application/json', 
        //           }, 
        //         },
        //       ); 
            
        // } catch (error) {
        //     context.log(error)
        // }

    context.res = {
        // status: 200, /* Defaults to 200 */
        body: responseMessage
    };
}