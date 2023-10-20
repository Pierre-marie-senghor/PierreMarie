import React, { useState,} from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";
import filterFactory, { textFilter} from "react-bootstrap-table2-filter";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faPen, faTrash, faArchive } from '@fortawesome/free-solid-svg-icons';
import { CSVLink } from 'react-csv';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import img from "../img/img.jpeg";
import "./Personnel.css"; 



function Personnel() {
  
//debut data
  const [data, setData] = useState([
    {
      image: img,
      name: "Fatou",
      mail: "manemal@gmail.com",
      phoneNumber: "+221 77346573",
      adresse: "tanaff",
      status: "eleve",
    },
    {
      image: img,
      name: "Ndiaye",
      mail: "manemal@gmail.com",
      phoneNumber: "+221 7674899",
      adresse: "tanaff",
      status: "personnel",
    },
    // ... Add more data objects
    {
      image: img,
      name: "Modou",
      mail: "manemal@gmail.com",
      phoneNumber: "+00 335346543",
      adresse: "tanaff",
      status: "professeur",
    },
    {
      image: img,
      name: "pierre",
      mail: "manemal@gmail.com",
      phoneNumber: "+221 757489943",
      adresse: "tanaff",
      status: "eleve",
    },
    {
      image: img,
      name: "Ciss",
      mail: "manemal@gmail.com",
      phoneNumber: "+221 787489900",
      adresse: "tanaff",
      status: "personnel",
    },
    {
      image: img,
      name: "Diouf",
      mail: "manemal@gmail.com",
      phoneNumber: "+221 7774895423",
      adresse: "tanaff",
      status: "eleve",
    },
    {
      image: img,
      name: "Rual Octe",
      mail: "manemal@gmail.com",
      phoneNumber: "+221 7674899213",
      adresse: "tanaff",
      status: "professeur",
    },
  ]);
//fin data

//debut customFiltre
  const customNameFilter = textFilter({
    placeholder: "entre le Nom",
    // ...
  });

  const customPhoneNumberFilter = textFilter({
    placeholder: "Entre le Numéro ",
    // ...
  });
  const customMailFilter = textFilter({
    placeholder: "Entre mail ",
    // ...
  });
  
  const customAdresseFilter = textFilter({
    placeholder: "Entre l'Heure",
  // ...
  });
  const customStatusFilter = textFilter({
    placeholder: "Entre Status",
    // ...
  });

  const columns = [
    {
      dataField: "image",
      text: "Profil",
      formatter: (cell) => <img src={cell} alt="Avatar" className="image rounded-circle w-2" />,
    },
    {
      dataField: "name",
      text: "NomC",
      filter: customNameFilter, // Apply the custom filter
    },
    {
        dataField: "mail",
        text: "Mail",
        filter: customMailFilter, // Apply the custom filter
      },
    {
      dataField: "phoneNumber",
      text: "Numéro",
      filter: customPhoneNumberFilter, // Apply the custom filter
    },
    {
      dataField: "adresse",
      text: "Adress",
      filter: customAdresseFilter, // Apply the custom filter
    },
    {
        dataField: "status",
        text: "Status",
        filter: customStatusFilter,
        
    },
    {
      dataField: 'actions',
      text: 'Actions',    
        formatter: (cell, row) => (   
          <div className="">
            <button className="for" onClick={() => handleAction("hide", row)}>
              <FontAwesomeIcon icon={faEye} />
            </button>
            <button className="for mx-1" onClick={() => handleAction("edit", row)}>
              <FontAwesomeIcon icon={faPen} />
            </button>
            <button className="for mx-1" onClick={() => handleAction("delete", row)}>
              <FontAwesomeIcon icon={faTrash} />
            </button>
            <button className="for" onClick={() => handleAction("archive", row)}>
              <FontAwesomeIcon icon={faArchive} />
            </button>
        </div>
        ),
    },
    // ... Other column     
  ];
     const handleAction = (action, row) => {
      // Implement your CRUD actions here
      if (action === "hide") {
        // Handle hide action
      } else if (action === "edit") {
        // Handle edit action
      } else if (action === "delete") {
        // Handle delete action
        setData(prevData => prevData.filter(item => item !== row));
      }
     };
// ...fin culumns
    
// ...debut de button reglage formulaire d'ajout 
   
const [formData, setFormData] = useState({
    name: "",
    mail: "",
    phoneNumber: "",
    adresse: "",
    status: "",
    image: null,
  });

  
  const [showForm, setShowForm] = useState(false); // État pour afficher/masquer le formulaire

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleImageChange = (e) => {
    const imageFile = e.target.files[0];
    setFormData({ ...formData, image: imageFile });
  };

  const handleAddData = () => {
    if (
      formData.name &&
      formData.mail &&
      formData.phoneNumber &&
      formData.adresse &&
      formData.status &&
      formData.image
    ) {
      setData([...data, formData]);
      setFormData({
        name: "",
        mail: "",
        phoneNumber: "",
        adresse: "",
        status: "",
        image: null,
      });
      setShowForm(false);
    } 
  };
     
  const handleCancel = () => {
    // Réinitialisez le formulaire et masquez-le lors de l'annulation
    setFormData({
      name: '',
      mail: '',
      phoneNumber: '',
      adresse: '',
      status: '',
      image: null,
    });
    setShowForm(false);
  }; 
// ...fin du button reglage du formulaire d'ajout


   // ...debut de reglage  du button export to csv
      const generateCSVData = () => {
        const csvData = [];
        
        // Ajoutez d'abord les en-têtes CSV (correspondant à vos colonnes de données)
        const headers = ["Name", "PhoneNumber", "Date", "ArrivalTime", "Status"];
        csvData.push(headers);

        // Ajoutez les données CSV
        data.forEach((row) => {
          const rowData = [row.name, row.phoneNumber, row.date, row.arrivalTime, row.status];
          csvData.push(rowData);
        });

        return csvData;
      };
   // ...fin de reglage  du button export to csv

   
  const [activeTab, setActiveTab] = useState('present'); 

  return (
    <div className="container">
      <div className="navtab">
        <div className="row">
          <div className="col-md-10 mt-5">
          <Tabs
              activeKey={activeTab}
              onSelect={(tab) => setActiveTab(tab)}
              id="controlled-tab-example"
              className="mb-3 liste"
            >
              <Tab eventKey="present" title="Liste de présence">
                <data data={activeTab === 'present' ? (data || data) : []} columns={columns} />
              </Tab>
             
         </Tabs>
         </div>
         <button
        type="button"
        className="btn btn-ajout mb-3 me-5"
        onClick={() => setShowForm(true)} // Affiche le formulaire lors du clic sur le bouton "Ajouter"
      >
        Ajouter
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M17.0156 12.9844V11.0156H12.9844V6.98438H11.0156V11.0156H6.98438V12.9844H11.0156V17.0156H12.9844V12.9844H17.0156ZM4.92188 4.96875C6.89062 3 9.25 2.01562 12 2.01562C14.75 2.01562 17.0938 3 19.0312 4.96875C21 6.90625 21.9844 9.25 21.9844 12C21.9844 14.75 21 17.1094 19.0312 19.0781C17.0938 21.0156 14.75 21.9844 12 21.9844C9.25 21.9844 6.89062 21.0156 4.92188 19.0781C2.98438 17.1094 2.01562 14.75 2.01562 12C2.01562 9.25 2.98438 6.90625 4.92188 4.96875Z"
            fill="#56CCF2"
          />
        </svg>
      </button>

      {showForm && (
       <div className="alert">
       {/* Titre et sous-titre */}
       <div className="col-md bg text-white titre">
         <h2 className="ps-2">Personnel</h2>
       </div>
       <p className="title p-2">ajouter une personnel</p>
       
     <div className="row p-2">

       <div className="col-md">
          <label className="form-label ">Image <span className="text-danger">*</span></label>
          <input  type="file" name="image" accept="image/*" onChange={ handleImageChange} />
        </div>

       <div className="col-md">
         <label className="form-label">NomComplet <span className="text-danger">*</span></label>
         <input type="text" name="name" value={formData.name} onChange={handleInputChange} />
       </div>
     
       <div className="col-md">
         <label className="form-label">Email <span className="text-danger">*</span></label>
         <input type="email" name="mail" value={formData.mail} onChange={handleInputChange} />
       </div>
     
       <div className="col-md">
         <label className="form-label">Numéro <span className="text-danger">*</span></label>
         <input type="text" name="phoneNumber" value={formData.phoneNumber} onChange={handleInputChange} />
       </div>
     
       <div className="col-md">
         <label className="form-label">Adresse <span className="text-danger">*</span></label>
         <input type="text" name="adresse" value={formData.adresse} onChange={handleInputChange} />
       </div>
     
       <div className="col-md">
         <label className="form-label">Status <span className="text-danger">*</span></label>
         <input type="text" name="status" value={formData.status} onChange={handleInputChange} />
       </div>
     </div>
     <div className="row mt-4">
     <div className="col-md">
     <p className="p-2"><span className="text-danger">*</span> Information obligatoire</p>
     </div>
     <div>
     <button type="button" className="btn btn-ajout" onClick={() => handleAddData()}>Ajouter un personnel</button>
     <button type="button" className="btn btn-ajoute ms-2 " onClick={handleCancel}>Annuler</button>

      </div>
     </div>
    
    </div>

       
     
      )}
     
     
        </div>
        <button type="button" className="btn btn-primar mb-3">
            <CSVLink data={generateCSVData()} filename={"Table_data.csv"}  className="btn-primar text-white" target="_blank">
            <svg width="16" height="15" viewBox="0 0 16 15" fill="none" className="icon mb-1" xmlns="http://www.w3.org/2000/svg">
                <path d="M0 0V15H14.2053V10L12.7848 11.25V13.75H1.42053V1.25H12.7848V3.75L14.2053 5V0H0ZM11.6526 4.375L10.654 5.25375L12.4744 6.875H5.61536V8.125H12.4737L10.654 9.74625L11.6526 10.625L14.716 7.95L15.2032 7.5L14.7153 7.05L11.6519 4.375H11.6526Z" fill="white"/>
            </svg>{" "} Export to CSV
            </CSVLink>
          </button>   
    </div>

      <div className="bootstraptable">
        <BootstrapTable
          bootstrap4
          keyField="name"
          data={data} 
          columns={columns}
          striped
          hover
          pagination={paginationFactory({
            sizePerPage: 5,
            sizePerPageList: [5, 10, 20],
            hidePageListOnlyOnePage: true,
          })}
          filter={filterFactory()} 
          wrapperClasses="table-responsive"
        />
      </div>
    </div>
  );
}

export default Personnel;
