import React, { useState } from "react";
import { ListGroup, Collapse, Button, Offcanvas } from "react-bootstrap";
import { ChevronDown, ChevronRight } from "lucide-react";

const CategorySidebar = ({ categories, expandedGroup, toggleGroup, handleKeyDown }) => {
  const [showSidebar, setShowSidebar] = useState(false);
  const isMobile = window.innerWidth < 768;

  const toggleSidebar = () => setShowSidebar(!showSidebar);

  const SidebarContent = () => (
    <>
      <ListGroup variant="flush" role="list" className="rounded">
        {categories.map((category, idx) => (
          <div key={idx} className="mb-2">
            <ListGroup.Item
              as="button"
              onClick={() => toggleGroup(category.group)}
              onKeyDown={(e) => handleKeyDown(e, category.group)}
              aria-expanded={expandedGroup === category.group}
              aria-controls={`collapse-${idx}`}
              className={`d-flex justify-content-between align-items-center woody-link px-3 py-2 border-0 rounded shadow-sm ${
                expandedGroup === category.group ? "bg-woody-accent text-white" : "bg-transparent"
              }`}
            >
              <span className="fw-semibold">{category.group}</span>
              {expandedGroup === category.group ? <ChevronDown size={18} /> : <ChevronRight size={18} />}
            </ListGroup.Item>
            <Collapse in={expandedGroup === category.group}>
              <ListGroup id={`collapse-${idx}`} className="ps-4 py-2 border-start border-3 border-woody-accent">
                {category.items.map((item, subIdx) => (
                  <ListGroup.Item
                    key={subIdx}
                    className="bg-transparent border-0 woody-link ps-2 py-1"
                    role="button"
                    tabIndex={0}
                  >
                    {item}
                  </ListGroup.Item>
                ))}
              </ListGroup>
            </Collapse>
          </div>
        ))}
      </ListGroup>
    </>
  );

  return (
    <div className="categories-sidebar bg-woody-bg text-woody-dark p-3 rounded shadow">
      {isMobile ? (
        <>
          <Button
            className="woody-toggle-btn mb-3"
            onClick={toggleSidebar}
            aria-controls="category-offcanvas"
            aria-expanded={showSidebar}
          >
            Toggle Categories
          </Button>
          <Offcanvas
            show={showSidebar}
            onHide={toggleSidebar}
            responsive="sm"
            className="bg-woody-bg text-woody-dark"
            id="category-offcanvas"
            aria-labelledby="offcanvasLabel"
          >
            <Offcanvas.Header closeButton>
              <Offcanvas.Title id="offcanvasLabel">Categories</Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>{SidebarContent()}</Offcanvas.Body>
          </Offcanvas>
        </>
      ) : (
        SidebarContent()
      )}
    </div>
  );
};

export default CategorySidebar;
