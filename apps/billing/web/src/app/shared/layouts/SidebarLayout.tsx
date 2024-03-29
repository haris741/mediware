import { Button, MenuItem, MenuList } from '@fluentui/react-components';
import { ReactNode } from 'react';
import Menu from '../organisms/Menu';

interface Props {
  children?: ReactNode | ReactNode[];
  sidebar?: ReactNode | ReactNode[];
  pageTitle?: string;
}
function SidebarLayout({ children, sidebar, pageTitle }: Props) {
  return (
    <div className="flex">
      <div className="min-w-[170pt] h-screen overflow-auto border-r border-r-gray-200">
        <h1 className="text-xl font-semibold border-b border-b-gray-200 min-h-[40pt] flex items-center px-3 justify-between">
          <div>Mediware</div>
        </h1>
        {sidebar}
      </div>
      <div className="w-full">
        <div className="min-h-[40pt] border-b border-b-gray-200 px-3 flex items-center justify-between">
          <h1 className="text-xl font-light capitalize">{pageTitle}</h1>
          <div>
            <Menu button={<Button>Settings</Button>}>
              <MenuList>
                <MenuItem>Account</MenuItem>
                <MenuItem>Profile</MenuItem>
              </MenuList>
            </Menu>
          </div>
        </div>
        <div className="p-3">{children}</div>
      </div>
    </div>
  );
}

export default SidebarLayout;
