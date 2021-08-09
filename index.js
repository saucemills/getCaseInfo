let aws = require('aws-sdk');
let dynamodb = new aws.DynamoDB();

exports.handler = function getCaseInfo(event, context, callback) {
    console.log(event.Details.Parameters.CaseNumber);
    let caseNumberToSearch = event.Details.Parameters.CaseNumber;
    
    let params = {
        TableName: "ABCInternet-Cases",
        Key: {
            "CaseNumber": { N: caseNumberToSearch }
        }
    };
    
    dynamodb.getItem(params, function(err, data) {
        if (err) {
            callback(err, null);
        } else {
            let resultMap = {
                "caseNumber": data.Item.CaseNumber.N.toString(),
                "Status": data.Item.Status.S,
            };
            console.log(resultMap);
            callback(null, resultMap);
        }
    });
};
