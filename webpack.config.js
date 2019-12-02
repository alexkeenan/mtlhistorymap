module.exports = {
    module:{
        rules:[
            {
                test: /\.js$/,  //this means any javascript file
                exclude:/node_modules/,  //as long as it's not in this folder
                use:{
                    loader: "babel-loader"
                }
            }
        ]   
    }
}