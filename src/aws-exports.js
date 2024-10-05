const awsmobile = {
    "aws_project_region": "eu-west-3",
    "aws_cognito_region": "eu-west-3",
    "aws_user_pools_id": "eu-west-3_EAMYRImla",
    "aws_user_pools_web_client_id": "28t9r9dkf5rndu3564i9i0cnn",
    "oauth": {
        "domain": "library.auth.eu-west-3.amazoncognito.com",
        "scope": [
            "openid",
            "email",
            "profile",
            "aws.cognito.signin.user.admin"
        ],
        "redirectSignIn": "https://d2k5n7t6j4twh.cloudfront.net/,http://localhost:3000/",
        "redirectSignOut": "https://d2k5n7t6j4twh.cloudfront.net/,http://localhost:3000/",
        "responseType": "code"
    },
    "federationTarget": "COGNITO_USER_POOLS"
};

export default awsmobile;
