// import { Addbranch } from "./pages/branch/add_branch";
import { ProtectedRoute } from "./context/protectRoute";
import { Addbranch } from "./pages/administration/branch/addBranch";
import { BranchPage } from "./pages/administration/branch/branch";
import { BranchUpdate } from "./pages/administration/branch/updateBranch";
import { CompanyPage } from "./pages/administration/company/company";
import { CompanyAdd } from "./pages/administration/company/companyAdd";
import { CompanyUpdate } from "./pages/administration/company/companyUpdate";
import { DepartmentPage } from "./pages/administration/department/department";
import { DepartmentAdd } from "./pages/administration/department/departmentAdd";
import { DepartmentUpdate } from "./pages/administration/department/departmentUpdate";
import { EmployeePage } from "./pages/administration/employee/employee";
import { EmployeeAdd } from "./pages/administration/employee/employeeAdd";
import { EmployeeUpdate } from "./pages/administration/employee/employeeUpdate";
import { AddBlog } from "./pages/blog/addBlog";
import { BlogPage } from "./pages/blog/blog";
import { UpdateBlog } from "./pages/blog/updateBlog";
import { ErrorPage } from "./pages/errorPage/errorPage";
import { AddFAQ } from "./pages/FAQ/addFAQ";
import { FAQPage } from "./pages/FAQ/FAQ";
import { UpdateFAQ } from "./pages/FAQ/updateFAQ";
import { HomePage } from "./pages/home/home";
import { LoginPage } from "./pages/login/login";
import { CreateTravelPolicy } from "./pages/travel_policy/create_travel_policy/addTravelPolicy";
import { ViewTravelPolicy } from "./pages/travel_policy/view_travel_policy/viewTravelPolicy";
import { Agent } from "./pages/agent/agent";
import { AddAgent } from "./pages/agent/Addagent";
import { UpdateAgent } from "./pages/agent/updateAgent";

import { Addservice } from "./Api/manage_api/service/addService";
import { ServiceUpdate } from "./Api/manage_api/service/updateService";
import { DetailPage } from "./Api/manage_api/details/detail";
import { AddDetail } from "./Api/manage_api/details/addDetails";
import { DetailUpdate } from "./Api/manage_api/details/updateDetails";
import { ServicePage } from "./Api/manage_api/service/service";
import { ApiSettingPage } from "./Api/Apii_setting/Api_setting";
import { ApiSettingPageDetail } from "./Api/Apii_setting/addition_detail";
import { InvoicePage } from "./pages/invoice/invoice";
import { AddInvoice } from "./pages/invoice/addInvoice";
import { UpdateInvoice } from "./pages/invoice/updateInvoice";
import { ViewInvoice } from "./pages/invoice/viewInvoice";
import { InvoicePage2 } from "./pages/invoice2/invoice2";
import { AddInvoice2 } from "./pages/invoice2/addInvoice2";
import { UpdateInvoice2 } from "./pages/invoice2/updateInvoice2";
import { ViewInvoice2 } from "./pages/invoice2/viewInvoice2";
import { SendInvoice } from "./pages/invoice/sendInvoice";
import { SendInvoice2 } from "./pages/invoice2/sendInvoice2";
import { SMPT_Page } from "./pages/manage_SMTP/SMPT";
import { AddSMTP } from "./pages/manage_SMTP/addSMTP";
import { UpdateSMTP } from "./pages/manage_SMTP/updateSMPT";
import { AddInvoiceCompany } from "./pages/manage_invoice_company/addinvoiceCompany";
import { InvoiceCompany } from "./pages/manage_invoice_company/invoiceCompany";
import { UpdateInvoiceCompany } from "./pages/manage_invoice_company/updateinvoiceCompany";
import { Tickets } from "./pages/ticket/ticket";
import { AddTicket } from "./pages/ticket/addTicket";
import { TicketDetail } from "./pages/ticket/ticketDetail";
import { UpdateTicket } from "./pages/ticket/updateTicket";

import { Tickets2 } from "./pages/ticket2/ticket2";
import { AddTicket2 } from "./pages/ticket2/addTicket2";
import { TicketDetail2 } from "./pages/ticket2/ticketDetail2";
import { UpdateTicket2 } from "./pages/ticket2/updateTicket2";

export const PRoutes = [
  { path: "/", element: <LoginPage /> },

  {
    path: "/",
    element: <ProtectedRoute />,
    children: [
      { path: "dashboard", element: <HomePage /> },

      // Company
      { path: "company", element: <CompanyPage /> },
      { path: "add_company", element: <CompanyAdd /> },
      { path: "update_company/:id", element: <CompanyUpdate /> },

      // Branch
      { path: "branch", element: <BranchPage /> },
      { path: "add_branch", element: <Addbranch /> },
      { path: "update_branch/:id", element: <BranchUpdate /> },

      // Department
      { path: "department", element: <DepartmentPage /> },
      { path: "add_department", element: <DepartmentAdd /> },
      { path: "update_department/:id", element: <DepartmentUpdate /> },

      // Employee
      { path: "employee", element: <EmployeePage /> },
      { path: "add_employee", element: <EmployeeAdd /> },
      { path: "update_employee/:id", element: <EmployeeUpdate /> },

      // Travel Policy
      { path: "create_travel_policy", element: <CreateTravelPolicy /> },
      { path: "view_travel_policy", element: <ViewTravelPolicy /> },

      // agent
      { path: "add_agent", element: <AddAgent /> },
      { path: "update_agent/:id", element: <UpdateAgent /> },
      { path: "agent", element: <Agent /> },
      // blog
      { path: "blog", element: <BlogPage /> },
      { path: "add_blog", element: <AddBlog /> },
      { path: "update_blog/:id", element: <UpdateBlog /> },

      // FAQ
      { path: "FAQ", element: <FAQPage /> },
      { path: "add_FAQ", element: <AddFAQ /> },
      { path: "update_FAQ/:id", element: <UpdateFAQ /> },

      // Manage API
      // service
      { path: "service_api", element: <ServicePage /> },
      { path: "add_service_api", element: <Addservice /> },
      { path: "update_service_api/:id", element: <ServiceUpdate /> },

      // detail
      { path: "detail_api/:service_id", element: <DetailPage /> },
      { path: "add_Details/:service_id", element: <AddDetail /> },
      { path: "update_Details/:service_id/:id", element: <DetailUpdate /> },

      // Api_Setting
      { path: "api_setting", element: <ApiSettingPage /> },
      { path: "api_setting/:service_id", element: <ApiSettingPageDetail /> },

      // Invoice
      { path: "invoice", element: <InvoicePage /> },
      { path: "add_invoice", element: <AddInvoice /> },
      { path: "update_invoice/:id", element: <UpdateInvoice /> },
      { path: "view_invoice/:id", element: <ViewInvoice /> },
      { path: "send_invoice/:id", element: <SendInvoice /> },

      // Invoice2
      { path: "invoice2", element: <InvoicePage2 /> },
      { path: "add_invoice2", element: <AddInvoice2 /> },
      { path: "update_invoice2/:id", element: <UpdateInvoice2 /> },
      { path: "view_invoice2/:id", element: <ViewInvoice2 /> },
      { path: "send_invoice2/:id", element: <SendInvoice2 /> },

      // manage_smtp
      { path: "SMTP", element: <SMPT_Page /> },
      { path: "add_SMTP", element: <AddSMTP /> },
      { path: "update_SMTP/:id", element: <UpdateSMTP /> },

      // manage invoice company
      { path: "add_Invoice_Company", element: <AddInvoiceCompany /> },
      { path: "Invoice_Company", element: <InvoiceCompany /> },
      { path: "update_Invoice_Company/:id", element: <UpdateInvoiceCompany /> },

      
      // Ticket
      { path: "Ticket", element: <Tickets /> },
      { path: "add_Ticket", element: <AddTicket /> },
      { path: "update_Ticket/:id", element: <UpdateTicket /> },
      { path: "ticket_Details/:id", element: <TicketDetail /> },
      

       // Ticket
       { path: "Ticket2", element: <Tickets2 /> },
       { path: "add_Ticket2", element: <AddTicket2 /> },
       { path: "update_Ticket2/:id", element: <UpdateTicket2 /> },
       { path: "ticket_Details2/:id", element: <TicketDetail2 /> }

    ],
  },

  { path: "*", element: <ErrorPage /> },
];
