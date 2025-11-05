import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchPosts, deletePost } from '../redux/actions/postActions';
import { useNavigate } from 'react-router-dom';
import { Pencil, Trash2 } from "lucide-react";
import {
  Table as MuiTable,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
} from "@mui/material";
import Edit from '@mui/icons-material/Edit';
import Delete from '@mui/icons-material/Delete';
import Pagination from './Pagination';
import {
  Table,
  Button
} from "reactstrap";
// import { Table as SemanticTable, Button as SemanticButton, Header, Icon } from "semantic-ui-react";
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
  getPaginationRowModel
} from '@tanstack/react-table';

function Home() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const posts = useSelector(state => state.posts.items);
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 10;

  useEffect(() => {
    dispatch(fetchPosts());
  }, [dispatch]);

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this post?')) {
      dispatch(deletePost(id));
    }
  };

  const handleEdit = (post) => {
    navigate(`/edit-post/${post.id}`);
  };

  const handleAddNewPost = () => {
    navigate('/postform');
  };

  // Pagination Logic
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);

  // Change page logic
  const paginate = pageNumber => setCurrentPage(pageNumber);


  // this is used for tanstack table
  const data = posts;
  const columns = [
    { header: 'ID', accessorKey: 'id' },      //header is text (or label) will appear at the top of the column
    { header: 'Title', accessorKey: 'title' },  //accessorkey is property name in data object
    { header: 'Body', accessorKey: 'body' },
    { header: 'Email', accessorKey: 'email' },
    { header: 'Contact', accessorKey: 'contact' },
    {
      header: 'Actions',
      cell: ({ row }) => (
        <>
          <button onClick={() => handleEdit(row.original)} >Edit</button>
          <button onClick={() => handleDelete(row.original.id)}>Delete</button>
        </>
      ),
    },
  ];
  const table = useReactTable({           //Hook that creates your table
    data,
    columns,
    getCoreRowModel: getCoreRowModel(), //built-in helper function that tells the table how to structure and manage rows.It’s the foundation that organizes your raw data into rows the table can understand.
    getPaginationRowModel: getPaginationRowModel()
  });

  return (
    <div className="container mt-5 mb-5 border border-secondary p-5 rounded-4 shadow-lg">
      <h1 className='text-center mb-5 text-primary'>React Redux CRUD with Axios</h1>

      <button className="btn btn-primary mb-3" onClick={handleAddNewPost}>Add New Post</button>
      <hr />
      <h2>Posts</h2>



      <h2 className='text-center'>This is to put data in normal boxes </h2>
      {currentPosts.map(post => (
        <div key={post.id} className="card mb-3 shadow border border-dark">
          <div className="card-body">
            <h5 className="card-title">{post.title}</h5>
            <p className="card-text">{post.body}</p>
            <p className="card-text">
              <small className="text-muted">Email: {post.email} | Contact: {post.contact}</small>
            </p>
            <button className="btn btn-sm btn-success me-2" onClick={() => handleEdit(post)}>Edit</button>
            <button className="btn btn-sm btn-danger" onClick={() => handleDelete(post.id)}>Delete</button>
          </div>
        </div>
      ))}



      <h2 className='text-center mt-5'>This is to put data in tables of normal react and bootstrap</h2>
      <table className="table table-bordered table-striped table-hover shadow">
        <thead className="table-dark text-center">
          <tr>
            <th>ID</th>
            <th>Title</th>
            <th>Body</th>
            <th>Email</th>
            <th>Contact</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {currentPosts.map((post) => (
            <tr key={post.id}>
              <td>{post.id}</td>
              <td>{post.title}</td>
              <td>{post.body}</td>
              <td>{post.email}</td>
              <td>{post.contact}</td>
              <td className="text-center">
                <div className="d-flex align-items-center">
                  <button
                    className="btn btn-sm btn-success me-2"
                    onClick={() => handleEdit(post)}
                  >
                    <Pencil size={16} />
                  </button>
                  <button
                    className="btn btn-sm btn-danger"
                    onClick={() => handleDelete(post.id)}
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>



      <h2 className='text-center mt-5'>This is to put data in tables of material UI </h2>
      <TableContainer component={Paper}>
        <MuiTable>  {/*This is actually table but its name is defined as MuiTable at the top where we import */}
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Title</TableCell>
              <TableCell>Body</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Contact</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {currentPosts.map((post) => (
              <TableRow key={post.id}>
                <TableCell>{post.id}</TableCell>
                <TableCell>{post.title}</TableCell>
                <TableCell>{post.body}</TableCell>
                <TableCell>{post.email}</TableCell>
                <TableCell>{post.contact}</TableCell>
                <TableCell>
                  <IconButton onClick={() => handleEdit(post)}>
                    <Edit />
                  </IconButton>
                  <IconButton onClick={() => handleDelete(post.id)}>
                    <Delete />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </MuiTable>
      </TableContainer>



      <h2 className='text-center mt-5'>This is to put data in tables of reactstrap</h2>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>ID</th>
            <th>Title</th>
            <th>Body</th>
            <th>Email</th>
            <th>Contact</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {currentPosts.map((post) => (
            <tr key={post.id}>
              <td>{post.id}</td>
              <td>{post.title}</td>
              <td>{post.body}</td>
              <td>{post.email}</td>
              <td>{post.contact}</td>
              <td>
                <Button
                  color="warning"
                  size="sm"
                  className="me-2"
                  onClick={() => handleEdit(post)}
                >
                  Edit
                </Button>
                <Button
                  color="danger"
                  size="sm"
                  onClick={() => handleDelete(post.id)}
                >
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>



      {/* semantic ui doesnt supports react version 19 */}
      {/* <h2 className='text-center'>This is to put data in tables of Semantic UI</h2>
      <SemanticTable celled striped selectable>
        <SemanticTable.Header>
          <SemanticTable.Row>
            <SemanticTable.HeaderCell>ID</SemanticTable.HeaderCell>
            <SemanticTable.HeaderCell>Title</SemanticTable.HeaderCell>
            <SemanticTable.HeaderCell>Body</SemanticTable.HeaderCell>
            <SemanticTable.HeaderCell>Email</SemanticTable.HeaderCell>
            <SemanticTable.HeaderCell>Contact</SemanticTable.HeaderCell>
            <SemanticTable.HeaderCell>Actions</SemanticTable.HeaderCell>
          </SemanticTable.Row>
        </SemanticTable.Header>

        <SemanticTable.Body>
          {currentPosts.map((post) => (
            <SemanticTable.Row key={post.id}>
              <SemanticTable.Cell>{post.id}</SemanticTable.Cell>
              <SemanticTable.Cell>{post.title}</SemanticTable.Cell>
              <SemanticTable.Cell>{post.body}</SemanticTable.Cell>
              <SemanticTable.Cell>{post.email}</SemanticTable.Cell>
              <SemanticTable.Cell>{post.contact}</SemanticTable.Cell>
              <SemanticTable.Cell>
                <Button
                  color="yellow"
                  size="small"
                  icon
                  labelPosition="left"
                  onClick={() => handleEdit(post)}
                >
                  <Icon name="edit" />
                  Edit
                </Button>
                <Button
                  color="red"
                  size="small"
                  icon
                  labelPosition="left"
                  onClick={() => handleDelete(post.id)}
                >
                  <Icon name="trash" />
                  Delete
                </Button>
              </SemanticTable.Cell>
            </SemanticTable.Row>
          ))}
        </SemanticTable.Body>
      </SemanticTable> */}

      {/* tanstack and toolkitprovider and MUI data grid and AG grid and ANT design table*/}

      <h2 className='text-center'>This is to put data in tables of Tanstack</h2>
      <table className="table table-bordered table-striped table-hover shadow">
        <thead>
          {table.getHeaderGroups().map((hg) => (    //table.getHeaderGroups() gives all the headers
            <tr key={hg.id}>
              {hg.headers.map((header) => (
                <th key={header.id}>
                  {flexRender(header.column.columnDef.header, header.getContext())}   {/* renders whatever content is defined in your table’s cells or headers */}
                  {console.log("header:", header)}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row) => (  //table.getRowModel().rows gives all the rows of your data.
            <tr key={row.id}>
              {row.getVisibleCells().map((cell) => (  //row.getVisibleCells() gives the cells in that row
                <td key={cell.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())} {/*Render whatever should appear in this cell*/}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>

      <div className="d-flex justify-content-center align-items-center mt-3">
        <Button
          onClick={() => table.setPageIndex(0)}
          disabled={!table.getCanPreviousPage()} //Returns true or false, depending on whether there is a previous page available.
          className="me-2"
        >
          {'<<'}
        </Button>
        <Button onClick={() => table.previousPage()} disabled={!table.getCanPreviousPage()} className="me-2"> {/* previousPage:If you’re on page 3, this takes you to page 2. */}
          Previous
        </Button>
        <span className='me-2'>
          Page{' '}
          <strong>
            {table.getState().pagination.pageIndex + 1} of {table.getPageCount()}{/* getPageCount: Returns the total number of pages. */}
          </strong>
        </span>
        <Button onClick={() => table.nextPage()} disabled={!table.getCanNextPage()} className="me-2">Next</Button>{/* nextPage:If you’re on page 1, this takes you to page 2. getCanNextPage: Returns true or false, depending on whether there is a next page.*/}
        <Button onClick={() => table.setPageIndex(table.getPageCount() - 1)} disabled={!table.getCanNextPage()}>{'>>'}</Button>
      </div>


      <Pagination
        postsPerPage={postsPerPage}     //10
        totalPosts={posts.length}       //100
        paginate={paginate}             //sets current page
        currentPage={currentPage}       //gives current page
      />
    </div>
  );
}

export default Home;



/*getState():Show me everything the table is currently doing.
console.log(table.getState());
output:
{
  pagination: {
    pageIndex: 2,       // current page (0-based)
    pageSize: 10        // number of rows per page
  },
  sorting: [
    { id: 'title', desc: false }  // current sorted column and order
  ],
  columnFilters: [
    { id: 'email', value: 'gmail.com' } // active filters
  ],
  columnVisibility: {                  // which columns are hidden/shown
    email: true,
    contact: false
  },
  rowSelection: {}  // which rows are selected (if any)
}

*/

