import React, { useEffect, useState } from "react";
import axios from "axios";
import {  Paper, Button, MenuItem, Select, Table, TableBody, TableCell,  TableContainer, TableHead, TableRow, TextField} from "@mui/material";

export default function StudentTable() {
  const [keyword, setKeyword] = useState("");
  const [dept, setDept] = useState("");
  const [students, setStudents] = useState([]);

 
  useEffect(() => {
    fetchAllStudents();
  }, []);

  const fetchAllStudents = () => {
    axios.get("http://localhost:9000/api/students")
      .then(res => setStudents(res.data))
      
  };

  const handleSearch = () => {
    axios.get(`http://localhost:9000/api/students/search?keyword=${keyword}`)
      .then(res => setStudents(res.data))
      
  };

  const handleFilter = () => {
    axios.get(`http://localhost:9000/api/students/filter?department=${dept}`)
      .then(res => setStudents(res.data))
      
  };

  const handleSort = (order) => {
    axios.get(`http://localhost:9000/api/students/sort?order=${order}`)
      .then(res => setStudents(res.data))
      
  };

  return (
    <Paper elevation={3} sx={{ padding: 2 }}>
      <h2>Student Dashboard</h2>

      <div style={{ marginBottom: 16, display: "flex", gap: 10 }}>
        <TextField
          label="Search by name"
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
        />
        <Button variant="contained" onClick={handleSearch}>Search</Button>

        <Select value={dept} onChange={(e) => setDept(e.target.value)} displayEmpty>
          <MenuItem value="">Filter By Dept</MenuItem>
          <MenuItem value="CSE">CSE</MenuItem>
          <MenuItem value="ECE">ECE</MenuItem>
          <MenuItem value="EEE">EEE</MenuItem>
          <MenuItem value="MECH">MECH</MenuItem>
          <MenuItem value="CIVIL">CIVIL</MenuItem>
        </Select>
        <Button variant="contained" onClick={handleFilter}>Filter</Button>

        <Button onClick={() => handleSort("asc")}>Sort GPA </Button>
        <Button onClick={() => handleSort("desc")}>Sort GPA </Button>
        <Button onClick={fetchAllStudents}>Reset</Button>
      </div>

      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Age</TableCell>
              <TableCell>Department</TableCell>
              <TableCell>GPA</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {Array.isArray(students) && students.map((student) => (
              <TableRow key={student.id}>
                <TableCell>{student.id}</TableCell>
                <TableCell>{student.name}</TableCell>
                <TableCell>{student.age}</TableCell>
                <TableCell>{student.department}</TableCell>
                <TableCell>{student.gpa}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
}