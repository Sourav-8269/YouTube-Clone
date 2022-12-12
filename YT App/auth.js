class User{
    constructor(){
        // this.name=n;
    }
    //# is used to make methods private
    #checkUsername(username){
       let value= username.includes("#")? false:true;
       return value;
    }
    #checkPassword(password){
        let value=password.length>8?true:false;
        return value;
    }
    async Signup(n,e,u,p,m,d){
        let isvalidated=this.#checkUsername(u) && this.#checkPassword(p);
        if(isvalidated){
            this.name=n;
            this.email=e;
            this.username=u;
            this.password=p;
            this.mobile=m;
            this.description=d;

            let actual_data=JSON.stringify(this);
            try{
                let res=await fetch(`https://masai-api-mocker.herokuapp.com/auth/register`,{
                    method:'POST',
                    body:actual_data,
                    headers:{
                        'Content-Type':'application/json'
                    }
                });
                let data= await res.json();
                console.log("")
            }
            catch(err){
                console.log(err)
            }

        }else{
            alert("Length")
        }
    }
}
let u1=new User();

function Register(){
    const name=document.getElementById("name").value;
    const email=document.getElementById("email").value;
    const username=document.getElementById("username").value;
    const password=document.getElementById("password").value;
    const mobile=document.getElementById("mobile").value;
    const description=document.getElementById("description").value;

    u1.Signup(name,email,username,password,mobile,description)
    alert("Signup Successful")
}
async function Login(){
    let login_data={
        username:document.getElementById("login-username").value,
        password:document.getElementById("login-password").value,
    };
    username=login_data.username;


    const login_url=`https://masai-api-mocker.herokuapp.com/auth/login`;
    let res=await fetch(login_url,{
        method:'POST',
        body:JSON.stringify(login_data),
        headers:{
            'Content-Type':'application/json',
        },
       })
       let data=await res.json();
       let token=data.token;
       console.log(data)
       if(data.token!=null){
        alert("Login Successful")
        window.location.href="index.html";
       }
    //    console.log(token)
       getdata(login_data.username,token)
}

async function getdata(username,token){
    
    const data_url=`https://masai-api-mocker.herokuapp.com/user/${username}`
    let res=await fetch(data_url,{
        headers:{
            'Content-Type':'application/json',
            Authorization: `Bearer ${token}`,

        },
    })
    let data=await res.json();
    console.log(data)
}
