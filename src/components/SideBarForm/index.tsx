// React imports
import { Sidebar } from "primereact/sidebar";
import React from "react";

// Interface imports
import type { SideBarFormProps } from "./interfaces";


// SideBarForm Component
const SideBarForm: React.FC<SideBarFormProps> = ({
    visible = false,
    width = '70%',
    ...props
}) => {

  // Custom Header 
  const customHeader = (
    <div className="flex align-items-center gap-2">
      <span className="font-bold" style={{ fontSize: '1.75rem', marginTop: '8px'}}>{props.header}</span>
    </div>
  );
 
  // Return Component
  return (
   <div className="card flex justify-content-center">

      {/* SideBar */}
      <Sidebar style={{ padding: '0.5rem 1rem', width: width }} header={customHeader} visible={visible} position="right" onHide={props.onHide}>
        {props.children}
      </Sidebar>

    </div>
  );
};

// Export SideBarForm
export default SideBarForm;