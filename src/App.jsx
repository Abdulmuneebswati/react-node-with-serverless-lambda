import { useState, useEffect } from 'react';

import {
  Box,
  Typography,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  styled,
  Button,
} from '@mui/material';

import axios from 'axios';
import './App.css';

const Component = styled(Box)`
  width: 80%;
  margin: 50px auto;
  & > h4 {
    margin-bottom: 20px;
  }
  & > div > table > thead {
    background-color: #000;
  }
  & > div > table > thead > tr > th {
    color: #ffffff;
    font-size: 16px;
    font-weight: 600;
  }
  & > div > table > tbody > tr > td {
    font-size: 16px;
  }
`;

function App() {
 const [users, setUsers] = useState([]);

 const API_URL = 'https://pu46b04ugh.execute-api.us-east-1.amazonaws.com/dev';

 useEffect(() => {
   const getData = async () => {
     const response = await axios.get(API_URL);
     setUsers(JSON.parse(response?.data?.data));
   };
   getData();
 }, []);

 const removeEntry = (id) => {
   const updatedUsers = users.filter((user) => user.id !== id);
   setUsers(updatedUsers);
 };
 console.log(users,"_____");
 return (
   <Component>
     <Typography variant='h4'>Users</Typography>
     <Box>
       <Table>
         <TableHead>
           <TableRow>
             <TableCell>Id</TableCell>
             <TableCell>Name</TableCell>
             <TableCell>Email</TableCell>
             <TableCell>Phone</TableCell>
             <TableCell>Salary</TableCell>
             <TableCell>Age</TableCell>
             <TableCell>Remove Entry</TableCell>
           </TableRow>
         </TableHead>
         <TableBody>
           {users?.map((user) => (
             <TableRow key={user.id}>
               <TableCell>{user.id}</TableCell>
               <TableCell>{user.name}</TableCell>
               <TableCell>{user.email}</TableCell>
               <TableCell>{user.phone}</TableCell>
               <TableCell>{user.salary}</TableCell>
               <TableCell>{user.age}</TableCell>
               <TableCell>
                 <Button
                   variant='contained'
                   color='error'
                   onClick={() => removeEntry(user.id)}
                 >
                   Remove
                 </Button>
               </TableCell>
             </TableRow>
           ))}
         </TableBody>
       </Table>
     </Box>
   </Component>
 );
}

export default App;
