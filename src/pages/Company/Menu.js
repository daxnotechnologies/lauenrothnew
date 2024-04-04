import { Button } from '@mui/material';
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from 'src/Context/AuthContext';
import Iconify from 'src/components/iconify/Iconify';

export default function Menu({ page, selectedCompany }) {
  const navigate = useNavigate();
  const { currentUser } = useAuth();

  return (
    <>
      <div className="row my-4 text-start">
        <div>
          <Button
            onClick={() => navigate('/dashboard/company/companies')}
            startIcon={<Iconify icon="mingcute:left-fill" />}
          >
            Back
          </Button>
        </div>
      </div>
      {['supervisor', 'superuser'].includes(currentUser.role) && (
        <Link
          to={`/dashboard/company/company_settings/${selectedCompany.id}`}
          state={{ selectedCompany }}
          className={
            (page === 'settings' ? 'menu-tab-btn' : 'bg-white  ') + ' btn px-4 py-2 my-2  rounded-0 text-muted'
          }
          style={{ border: '1px solid #EFEFEF', fontWeight: 600 }}
        >
          Account settings
        </Link>
      )}
      {['supervisor', 'superuser', 'admin'].includes(currentUser.role) && (
        <Link
          to={`/dashboard/company/comapny_users/${selectedCompany.id}`}
          state={{ selectedCompany }}
          className={(page === 'users' ? 'menu-tab-btn' : 'bg-white  ') + ' btn  px-4 py-2 my-2 rounded-0 text-muted'}
          style={{ border: '1px solid #EFEFEF', fontWeight: 600 }}
        >
          Users
        </Link>
      )}
      {['supervisor', 'superuser', 'admin', 'content_admin'].includes(currentUser.role) && (
        <Link
          to={`/dashboard/company/comapny_content/${selectedCompany.id}`}
          state={{ selectedCompany }}
          className={(page === 'content' ? 'menu-tab-btn' : 'bg-white  ') + ' btn  px-4 py-2 my-2 rounded-0 text-muted'}
          style={{ border: '1px solid #EFEFEF', fontWeight: 600 }}
        >
          Content
        </Link>
      )}
    </>
  );
}
