import React, { useState, useRef, useEffect } from 'react'
import './Dashboard.css'
import {Link} from 'react-router-dom';
import { Navv } from './Navv';
import { Box, Grid, styled, Paper, Table, TextField, TableBody, TableCell, TableContainer, TableHead, TableRow, Button } from '@mui/material'
import { Card, CardGroup } from 'react-bootstrap';
import { fontSize } from '@mui/system';
const URL = "http://localhost:3001/calci"
const regForName = RegExp(/^[a-zA-Z]/);
export const Home = () => {
    const Item = styled(Paper)(({ theme }) => ({
        ...theme.typography.body2,
        padding: theme.spacing(1),
        color: theme.palette.text.secondary,
    }));

    const budgetRef = useRef('')
    const TitleRef = useRef('') 
    const AmountRef = useRef('')

    const [data, setData] = useState({});
    const [userdata, setuserdata] = useState([]);
    const [index, setindex] = useState(0);

    const [budgetdisplay, setbudgetdisplay] = useState(0)
    const [expensesdisplay, setexpensesdisplay] = useState(0)
    const [balance, setbalance] = useState(0)
    
    // const [expenses, setexpenses] = useState([])
    // const [budget, setbudget] = useState('')
    // const [isEditId, setisEditId] = useState(null)
    const [toggleBtn, settoggleBtn] = useState(true)

    // const expTitleRef = useRef(null)
    // const expAmountRef = useRef(null)

    const add = () => {
        const user = JSON.parse(localStorage.getItem('mycart'))
        const bud = parseInt(budgetRef.current.value);
        if(bud>0){
            user.totalbudget=user.totalbudget+bud
            localStorage.setItem('mycart',JSON.stringify(user))
            budgetRef.current.value=""
        }
        else{
            alert("Budget Should be more than Zero")
        }
    }

    const AddExpense = ()=>{
        const user = JSON.parse(localStorage.getItem('mycart'))
        const usertitle= TitleRef.current.value
        const useramount= parseInt(AmountRef.current.value)
        if(usertitle!=null && regForName.test(usertitle)){
            localStorage.setItem('mycart',JSON.stringify(user))
            if(useramount>0){
                const expense= {title:usertitle, amount:useramount}
                user.budget=[...user.budget,expense]
                localStorage.setItem('mycart',JSON.stringify(user))
                TitleRef.current.value=""
                AmountRef.current.value=""
            }
            else{
                alert("Budget Should be more than Zer0")
            }
        }
        else{
            alert("Please enter correct title")
        }
    }

    const deletes = (index) => {
        const user = JSON.parse(localStorage.getItem('mycart'))
        const bool = window.confirm("Do You really want to delele this?")
        if (bool === true) {
            user.budget.splice(index, 1)
            setData({ ...user });
            localStorage.setItem('mycart', JSON.stringify(user));
        }
        const user1 = JSON.parse(localStorage.getItem('mycart'))
        const userd = user1.budget
        setuserdata([...userd])
    }
    useEffect(()=>{
        const user = JSON.parse(localStorage.getItem('mycart'))
        setbudgetdisplay(user.totalbudget)
        let exp = 0
        user.budget.map(ele=>
            exp=ele.amount+exp
        )
        setexpensesdisplay(exp)
        setbalance(budgetdisplay-expensesdisplay)
    })

    useEffect(()=>{
        if(localStorage.getItem('mycart')!==undefined){
            const user1 = JSON.parse(localStorage.getItem('mycart'))
            const userd = user1.budget
            setuserdata([...userd])}

    },[budgetdisplay])

    const update =(index,ele)=>{
        console.log(ele)
        // let temp=JSON.parse(localStorage.getItem('mycart'));
        TitleRef.current.value= ele.title
        AmountRef.current.value= ele.amount
        settoggleBtn(false)
        setindex(index)
    }

    const updatedata=()=>{
        let user=JSON.parse(localStorage.getItem('mycart'));
        let temp=user.budget
        console.log(temp)
        temp[index].title=TitleRef.current.value
        temp[index].amount=parseInt(AmountRef.current.value)
        console.log(temp)
        user.budget=temp
        settoggleBtn(true)
        // temp.expenses[]
        localStorage.setItem('mycart',JSON.stringify(user))
        setuserdata([...user.budget])
        TitleRef.current.value=null
        AmountRef.current.value=null

    }
   
    // const logout = () => {
    //     let id = JSON.parse(localStorage.getItem('mycart')).id;
    //     let _fname = JSON.parse(localStorage.getItem('mycart')).fname;
    //     let _lname = JSON.parse(localStorage.getItem('mycart')).lname;
    //     let _email = JSON.parse(localStorage.getItem('mycart')).email;
    //     let _username = JSON.parse(localStorage.getItem('mycart')).username;
    //     let _password = JSON.parse(localStorage.getItem('mycart')).password;

    //     var newURl = `${URL}/${id}`
    //     let formData = {
    //         password: _password, email: _email, fname: _fname, lname: _lname, username: _username,
    //         budget: [...expenses, {
    //             totalbudget: addData,
    //             title: expTitleRef.current.value,
    //             expences: expAmountRef.current.value
    //         }]
    //     }
    //     console.log(formData)

    //     const user1 = JSON.parse(localStorage.getItem('mycart'))

    //     const budget = {
    //         title: expTitleRef.current.value,
    //         expences: expAmountRef.current.value
    //     }
    //     user1.budget = [...user1.budget, budget]
    //     setexpenses([...user1.budget])

    //     localStorage.setItem('mycart', JSON.stringify(user1))

    //     fetch(newURl, {
    //         method: 'PUT',
    //         body: JSON.stringify(formData),
    //         headers: {
    //             "content-type": "application/json",
    //             'Accept': 'application/json'
    //         }
    //     })
    //         .then(res => res.json())
    //         .then(data => {
    //             alert("Password Updated");
    //             fetch(URL)
    //                 .then(res => res.json())
    //                 .then(data => {
    //                     console.log(data)
    //                 })
    //                 .catch(err =>
    //                     console.log(err)
    //                 )
    //         })
    // }
    // const delete1 = (id) => {
    //     var newData = [...expenses]
    //     var todo = newData.filter((exp, i) => {
    //         return i !== id;
    //     })
    //     setexpenses(todo)
    // }

    // const edit = () => {
    //     const expenseData = expTitleRef.current.value;
    //     const amountData = expAmountRef.current.value;
    //     expenses[isEditId] = { id: isEditId, title: expenseData, expences: amountData }
    //     setexpenses([...expenses])
    //     settoggleBtn(true)

    // }

    // const update = (id, data) => {
    //     expTitleRef.current.value = data.title
    //     expAmountRef.current.value = data.expences;
    //     settoggleBtn(false)
    //     setisEditId(id)

    // }

    // useEffect(() => {
    //     if (localStorage.getItem('mycart') !== undefined) {
    //         const user1 = JSON.parse(localStorage.getItem('mycart'))
    //         const userd = user1.budget
    //         setexpenses([...userd])
    //     }
    //     else {
    //         const user1 = JSON.parse(localStorage.getItem('mycart'))
    //         const userd = user1.budget
    //         localStorage.setItem('mycart', JSON.stringify([...userd]))
    //     }
    // }, [])

    return (
        <>
            <Navv />
            {localStorage.getItem('mycart')!==undefined ?
                 <Box sx={{ flexGrow: 1 }}>
                 <Grid container spacing={2}>
                     <Grid item xs={3}
                         sx={{
                             display: 'flex',
                             flexWrap: 'wrap',
                             '& > :not(style)': {
                                 height: 600,
                                 borderRadius: '10px',
                             },
                         }}
                     >
                         <Item>
                             <Grid container spacing={2}>
                                 <Grid item xs={12} sm={12} style={{ marginTop: '50px' }}>
                                     <Grid>
                                         <h4> Budget Details</h4>
                                         <TextField
                                             type="number"
                                             placeholder="enter budget"
                                             inputRef={budgetRef}
                                             label="Enter Budget"
                                           
                                         ></TextField>
 
                                         <Button
                                             type="submit"
                                             fullWidth
                                             value="Add"
                                             variant="contained"
                                             onClick={add}
                                             sx={{ mt: 3, mb: 2 }}
                                         >
                                             Add
                                         </Button>
                                     </Grid>
                                     <h4> Details</h4>
 
 
 
                                     <TextField
                                         autoComplete="given-name"
                                         required
                                         type="text"
                                         fullWidth
                                         inputRef={TitleRef}
                                         label="Enter your Expense Title here.."
                                     ></TextField>
                                 </Grid>
                                 <Grid item xs={12} sm={12}>
                                     <TextField
                                         className="head"
                                         type="text"
                                         fullWidth
                                         inputRef={AmountRef}
                                         label="Enter your Expense Amount here.."
                                     ></TextField>
                                 </Grid>
                             </Grid>
                             <br />
                             {
                                toggleBtn ?
                                    <Button
                                        type="submit"
                                        fullWidth
                                        value="Add"
                                        variant="contained"
                                        onClick={AddExpense}
                                        sx={{ mt: 3, mb: 2 }}
                                    >

                                        Add
                                    </Button>
                                    :
                                    <Button
                                        type="submit"
                                        fullWidth
                                        value="Edit"
                                        variant="contained"
                                        onClick={updatedata}
                                        sx={{ mt: 3, mb: 2 }}
                                    >

                                        Edit
                                    </Button>

                            }
                         </Item>
                     </Grid>
                     <Grid item xs={9}>
                         <Item>
 
 
                             <h4 className='head'>
                                ***************** Welcome to Budget App ******************* </h4>
                             <Box
                                 sx={{
                                     display: 'flex',
                                     flexWrap: 'wrap',
                                     '& > :not(style)': {
                                         m: 1,
                                         width: 1000,
                                         borderRadius: '10px',
                                     },
                                 }}
                             >
                                 
                                 <Paper elevation={0} />
             <Paper /> 
                                 <Paper elevation={10} style={{ backgroundColor: 'white' }}>
                                     <h4 style={{ color: '#40a832' }}>Category Details</h4>
                                     <CardGroup>
                                         <Card>
 
                                             <Card.Body>
                                                 <Card.Title >BUDGET</Card.Title>
                                                 <Card.Img variant="top" 
                                                 src="budget.jfif" style={{ width: '100px', height: '100px', borderRadius: '50%' }} />
 
                                                 <Card.Text>
                                                     <h1 style={{ color: 'red' }}>
                                                         <br />
                                                         Rs: {budgetdisplay}</h1>
 
                                                 </Card.Text>
                                             </Card.Body>
 
                                         </Card>
                                         <Card>
 
                                             <Card.Body>
                                                 <Card.Title>EXPENSES</Card.Title>
                                                 <Card.Img variant="top" 
                                                 src="expences.jfif" style={{ width: '100px', height: '100px', borderRadius: '50%' }} />
 
                                                 <Card.Text>
                                                     <h1 style={{ color: 'red' }}>
                                                         Rs: {expensesdisplay}</h1>
 
                                                 </Card.Text>
                                             </Card.Body>
 
                                         </Card>
                                         <Card>
 
                                             <Card.Body>
                                                 <Card.Title>BALANCE</Card.Title>
                                                 <Card.Img variant="top" src="balance.jfif" style={{ width: '100px', height: '100px', borderRadius: '50%' }} />
 
                                                 <Card.Text>
                                                     <h1 style={{ color: 'red' }}>
                                                         Rs: {balance}</h1>
                                                 </Card.Text>
                                             </Card.Body>
 
                                         </Card>
                                     </CardGroup>
 
 
 
                                     <TableContainer component={Paper} className="container" style={{ marginTop: '20px', padding: '20px'}}>
                                         <Table sx={{ minWidth: 650 }} aria-label="simple table">
                                             <TableHead>
                                                 <TableRow style={{ background: '#a83255' }}>
                                                     <TableCell>ID</TableCell>
                                                     <TableCell align="right">Expense Title</TableCell>
                                                     <TableCell align="right">Expense Value</TableCell>
                                                     <TableCell align="right"> Action </TableCell>
 
                                                 </TableRow>
                                             </TableHead>
                                             <TableBody>
                                             {userdata.length ?
                                                 userdata.map((exp, index) =>
                                                     <TableRow
                                                         key={index}
                                                         sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                                         style={{ background: '#ccebff' }}
                                                     >
                                                         <TableCell component="th" scope="row">
                                                             {index}
                                                         </TableCell>
                                                         <TableCell align="right">{exp.title}</TableCell>
                                                         <TableCell align="right">{exp.amount}</TableCell>
                                                         <TableCell align="right">
                                                             <button className="btn btn-danger" onClick={() => { deletes(index) }}>Delete</button> &nbsp;
                                                             <button className="btn btn-warning text-white" onClick={() => { update(index, exp) }}>Update</button>
 
 
                                                         </TableCell>
 
                                                     </TableRow>
                                                 )
                                                 : 
                                             <p>No Task</p>  }
 
                                             </TableBody>
                                             
                                         </Table>
 
                                     </TableContainer>
 
 
 
                                 </Paper>
 
                             </Box>
                         </Item>
                         <Item>
 
                          {/* <Link to="/"><button onClick={logout}>Logout </button></Link>  */}
 
                         </Item>
                     </Grid>
                 </Grid>
             </Box>
           :  <Link to="/"></Link> 
           }
          
           
            



        </>
    )
}
