data ={}
data.employees =require('../../model/employees.json')

const getallemployees=(req, res) =>{
    res.json(data.employees)
}

const createNewEmployee = (req, res)=>{
    res.json({
        'firstName':req.body.firstName,
        'lastName':req.body.lastName
    })
}
const updateEmployee=(req, res)=>{
    res.json({
        'firstName':req.body.firstName,
        'lastName':req.body.lastName
    })
}
const deleteEmployee = (req,res)=>{
    res.json({"id":req.body.id})

}

const getEmployees=(req,res)=>{
    res.json({"id":req.body.id})

}