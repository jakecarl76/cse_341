
//even though this is before, it will appear after other console logs
setTimeout( () => { console.log("timer ended.");}, 2000);

console.log("this is after, but before");
console.log("this too...");

const my_async_func = () => {
      const promise = new Promise((resolve, reject) => {
              setTimeout( () => {
                                 if(true) //change to false to see reject used
                                 {
                                   resolve('promise resolved');
                                 }
                                 else
                                 {
                                   reject("promise failure");
                                 }
                                }, 1500);
              });//end promise params --> new Promise( (resolve, reject) => {...} )
              return promise;
};//end async func
       
       
setTimeout ( () => { console.log("async func executing now....");
                     my_async_func()
                       .then(text => {console.log(text); 
                                      return my_async_func();})
                       .then(text2 => {console.log("nested promise call: " + text2)}) //.then for second call to async func
                       .catch( fail => {console.log(fail)}); //catch to execute on reject case
                   }, 2000);