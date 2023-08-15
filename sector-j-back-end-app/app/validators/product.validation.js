const stringRegEx = /[^-\s\w-_.,#]/
const hexColorRegEx = /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/
const dollarRegEx = /^\$?[0-9]+(\.[0-9][0-9])?$/;

exports.validateProduct = (req) =>{
    console.log("validating Product...");
    const productFields = [
        'name',         //val
        'description',  //val
        'image',        //val
        'quantity',     //val
        'size',         //val
        'color',        //val
        'condition',    //val
        'price',        //val
        'type',         //val
        'wizdudsId',    //val
        'enabled'       //val
        ];
    
        const sizes = ['xs','s','m','l','xl','xxl','xxxl','xxxxl',
        '0-3 mo','newborn','12 mo','18 mo','1t','2t','3t','4t','5t','6t',
        '1','2','3','4','5','6','7','8','9','10','11','12'];
    
        const conditions  = ['new','used','custom']
    
        let err = "";
        let isString = value => typeof value === 'string' || value instanceof String;
    
        for (i in productFields) {
            if(!req.body[productFields[i]] &&
                (productFields[i]!= "enabled") 
                ) {//check for empty fields
                err += productFields[i] + " is a required field.  "
            }else if( //check strings
                isString(req.body[productFields[i]]) &&
                (productFields[i]!= "image") &&
                (productFields[i]!= "quantity") &&
                (productFields[i]!= "type") &&
                (productFields[i]!= "enabled") 
            ) {
                //check the product name 
                if( productFields[i]== "name"){
                    const productName = req.body[productFields[i]];
                    if(!(productName.length<150)){
                        err += "Product name must be under 150 characters.  ";
                    }
                    if(!(productName.length>5)){
                        err += "Product name must be greater than 5 characters.  ";
                    }
                    if(stringRegEx.test(productName)){
                        err += "Product name must be letters numbers or underscore.  ";
                    }
                }
    
                //check the product description 
                if( productFields[i]== "description"){
                    const productdescription = req.body[productFields[i]];
                    if(!(productdescription.length<500)){
                        err += "Product description must be under 500 characters.  ";
                    }
                    if(!(productdescription.length>5)){
                        err += "Product description must be greater than 5 characters.  ";
                    }
                    if(stringRegEx.test(productdescription)){
                        err += "Product description must be letters numbers or punctuation.  ";
                    }
                }
            
                //check to make sure size is on size chart
                if(
                    productFields[i]== "size" &&
                    (stringRegEx.test(req.body[productFields[i]]))
                ){
                    err += productFields[i] + "Product size must be letters numbers or punctuation.  ";
                }
    
                //check to make sure color is a hex color 
                if(
                    productFields[i]== "color" &&
                    (stringRegEx.test(req.body[productFields[i]]))
                ){
                    console.log(req.body[productFields[i]].match(stringRegEx))
                    err += productFields[i] + "Product color must be letters numbers or punctuation.  ";
                }
    
                //check to make sure condition is in the list 
                if(
                    productFields[i]== "condition" &&
                    (!conditions.includes(req.body[productFields[i]]))
                ){
                    err += productFields[i] + " must be a valid condition conditions are " + conditions.join() + ".  ";
                }
    
                //check price for dollar amount 
                if(
                    productFields[i]== "price" &&
                    (!dollarRegEx.test(req.body[productFields[i]]))
                ){
                    err += productFields[i] + " must be a valid dollar amount.  ";
                }
    
                //check wizduds id 
                if( productFields[i]== "wizdudsId"){
                    const wizId = req.body[productFields[i]];
                    if(wizId){
                        if(!(wizId.length<255)){
                            err += "Product ID must be under 500 characters.  ";
                        }
                        if(!(wizId.length>5)){
                            err += "Product ID must be greater than 5 characters.  ";
                        }
                        if(stringRegEx.test(wizId)){
                            err += "Product ID must be letters numbers or underscore.  ";
                        }
                    }
                }
                if(
                    productFields[i]== "image" &&
                    stringRegEx.test(req.body[productFields[i]])
                ){
                    console.log(req.body[productFields[i]].match(stringRegEx))
                    err += productFields[i] + " is the image name without the file type.  "
                }
                if(
                    productFields[i]== "type" &&
                    stringRegEx.test(req.body[productFields[i]])
                ){
                    console.log(req.body[productFields[i]].match(stringRegEx))
                    err += productFields[i] + " must be an product type object. name,description,enabled. or a product type ID.  "
                }
    
            }else{
                //this is all non-strings
    
                if( 
                    (productFields[i]!= "type") &&
                    (productFields[i]!= "enabled") 
                ){
                    err += productFields[i] + " must be a string.  "
                }
    
                //check boolean 
                if(
                    productFields[i]== "enabled" &&
                    (typeof req.body[productFields[i]] != "boolean")
    
                ){
                    err += productFields[i] + " must be a boolean.  "
                }
    
                //check objects
                let isObject = value => typeof value === 'object' || value instanceof Object;
                if(
                    productFields[i]== "type" &&
                    !isObject(req.body[productFields[i]]) &&
                    !isString(req.body[productFields[i]])
                ){
                    err += productFields[i] + " must be an product type object. name,description,enabled. or a product type ID.  "
                }
                
            }
    
    
        }// end for loop 
        return err
}

exports.validateProductImage = (req) =>{
    console.log("validating Product Image...");
    //check product image 
    //name,quantity,imageType,
    let err = "";
    const productImage = req.body.image;
    if(productImage){
        const imgTypes = ['jpeg','jpg','png','svg'];
        //check the product name 
        const productImageName = productImage.name || "";
        if(!(productImageName.length<150)){
            err += "Product Image name must be under 150 characters.  ";
        }
        if(!(productImageName.length>5)){
            err += "Product Image name must be greater than 5 characters.  ";
        }
        if(stringRegEx.test(productImageName)){
            err += "Product Image name must be letters numbers or underscore.  ";
        }
        //check image quantity 
        if(isNaN(productImage.quantity)){
            err += "Product Image quantity must be a number.  "
        }
        //check image type
        if(!imgTypes.includes(productImage.imageType)){
            err += "Product Image type must be a one of the following. " + imgTypes.join() + ".  ";
        }
    }else{
        err += "product must have a product image object with. name,quantity,imageType.  ";
    }
    return err
}

exports.validateProductType = (req) =>{
    console.log("validating Product Type...");
    //check product type 
    //name,description,enabled,
    let err = "";
    const productType = req.body.type;
    if(productType){
        //check the product name 
        const productTypeName = productType.name||"";
        if(!(productTypeName.length<150)){
            err += "Product type name must be under 150 characters.  ";
        }
        if(!(productTypeName.length>5)){
            err += "Product type name must be greater than 5 characters.  ";
        }
        if(stringRegEx.test(productTypeName)){
            err += "Product type name must be letters numbers or underscore.  ";
        }
        
        
        //check product type description 
        const productTypeDescription = productType.description ||"";
        if(!(productTypeDescription.length<500)){
            err += "Product type description must be under 500 characters.  ";
        }
        if(!(productTypeDescription.length>5)){
            err += "Product type description must be greater than 5 characters.  ";
        }
        if(stringRegEx.test(productTypeDescription)){
            err += "Product type description must be letters numbers or underscore.  ";
        }
        //check enabled 
        if(typeof productType.enabled != "boolean"){
            err += productFields[i] + " must be a boolean.  "
        }
    }else{
        err += "product must have a product Type object with. name,description,enabled.  ";
    }
    return err
}