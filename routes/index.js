var express = require('express');
var router = express.Router();
const {Medicine} = require('../models/medicine')

/* GET home page. */
router.get('/', function(req, res, next) {
  Medicine.find({}).then((medicines)=>{
    // console.log (medicines)
    res.render('list',{title: 'Medicines', medicines: medicines});
  })
});

router.get('/add',(req,res)=>{
  res.render('add')
})
router.post('/add',(req,res)=>{
  let medicine = new Medicine({
    name:req.body.name,
    description:req.body.description,
    price:req.body.price
  })
  
  console.log(req.body)
  medicine.save().then(function(doc){
    console.log (doc._id)
  }).then(()=>{
    res.redirect('/')
  }).catch(function (error) {
    console.log(error);
});
})

router.get('/edit/:id',(req,res)=>{
  let id = req.params.id
  Medicine.findById(id).then((medicine)=>{
    // console.log(medicine)
    res.render('edit',{medicine:medicine})
  })
})
router.post('/edit/:id',(req,res)=>{
  let medicine ={
    name:req.body.name,
    description:req.body.description,
    price:req.body.price
  }
  let query = {
    _id: req.params.id
  }
    Medicine.updateOne(query,medicine).then((doc)=>{
      console.log(doc)
      res.redirect('/')
    }).catch(err=>console.log(err))

})
router.get('/delete/:id',(req,res)=>{
  let query ={
    _id: req.params.id
  }
  Medicine.deleteOne(query).then(()=>{
    console.log('Deleted Successfully')
  }).then(()=>{
    res.redirect('/')
  })
})
router.post('/search',(req,res)=>{
 let searchQuery = req.body.search
 Medicine.find({
  $or:[{name:{$regex:searchQuery,$options:'i'}},
  {description:{$regex:searchQuery,$options:'i'}},
  {price:{$regex:searchQuery,$options:'i'}}]
 }).then((searchResults)=>{
  res.render('search',{title:'Search Results',searchResults})
  console.log (searchResults)
 }).catch(err=>console.log(err))
})
  
module.exports = router;










// router.post('/search',(req,res)=>{
//   let searchQuery ={name: req.body.search }
//   Medicine.findOne(searchQuery).then((searchData)=>{
//     res.redirect('/search')
//     console.log (searchData)
//   })
//   console.log (req.body.search)
// })