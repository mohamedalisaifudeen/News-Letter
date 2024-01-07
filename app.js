const express=require('express');
const body_parser=require('body-parser')
const mailchimp=require('@mailchimp/mailchimp_marketing')
const app=express();

mailchimp.setConfig({
  apiKey:'c9aba5a31d4483986b2d4ffd867f974d-us21',
  server:"us21"
});



app.use(body_parser.urlencoded({extended:true}))
app.use(express.static('public'))

app.get('/',function(req,res){
  res.sendFile(__dirname+'/index.html');
})



app.post('/',function(req,res){
  async function run(){
    const response= await mailchimp.lists.batchListMembers('ee77c76a07',{
      members:[{
        email_address:req.body.email,
        status:"subscribed",
        merge_fields:{
          FNAME:req.body.Fname,
          LNAME:req.body.Lname
        }
      }]
    });
    if((response.new_members).length>=1){
      res.send("Sucess")
    }else{
      res.send('Failed')
    }
  }
  run()
})

app.listen(3000,function(){
  console.log("Server is running in port 3000")
})
