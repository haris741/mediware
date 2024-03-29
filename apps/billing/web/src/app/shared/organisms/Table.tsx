import {
  Button,
  Table as FUITable,
  MenuItem,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from '@fluentui/react-components';
import moment from 'moment';
import Menu from './Menu';

interface Props<Type> {
  data: Type[];
  headers?: string[];
  onDelete?: (data: Type) => void;
  onEdit?: (data: Type) => void;
  onAddData?: () => void;
}

const Table = <Type,>({
  data,
  onDelete,
  onEdit,
  headers,
  onAddData,
}: Props<Type>) => {
  return (
    <div className="w-full overflow-scroll min-h-[80vh]">
      {data.length > 0 ? (
        <FUITable>
          <TableHeader>
            {headers && headers.length > 0 ? (
              <TableRow>
                {headers.map((header) => (
                  <TableCell key={header}>{header}</TableCell>
                ))}
              </TableRow>
            ) : (
              <TableRow>
                {Object.keys(data[0] as Type[]).map((key) => (
                  <TableCell key={key} className="capitalize">
                    {key}
                  </TableCell>
                ))}
                {(onEdit || onDelete) && <TableCell>Actions</TableCell>}
              </TableRow>
            )}
          </TableHeader>
          {typeof data[0] === 'object' && (
            <TableBody>
              {data.map((row, index) => (
                <TableRow key={`${JSON.stringify(row)}-${index}`}>
                  {Object.keys(row as object).map((column, index) => {
                    const value = Object.values(row as object).at(index);
                    return (
                      <TableCell key={`${index}${JSON.stringify(value)}`}>
                        {column.toLowerCase().includes('tedat')
                          ? moment(value).format('MMM Do, YYYY hh:mm')
                          : value}
                      </TableCell>
                    );
                  })}
                  {(onEdit || onDelete) && (
                    <TableCell>
                      <div className="flex flex-row gap-2">
                        <Menu button={<Button>Action</Button>}>
                          {onEdit && (
                            <MenuItem onClick={() => onEdit(row)}>
                              Edit
                            </MenuItem>
                          )}
                          {onDelete && (
                            <MenuItem onClick={() => onDelete(row)}>
                              Delete
                            </MenuItem>
                          )}
                        </Menu>
                      </div>
                    </TableCell>
                  )}
                </TableRow>
              ))}
            </TableBody>
          )}
        </FUITable>
      ) : (
        <div className="flex gap-3 flex-col items-center justify-center min-h-[70vh]">
          <div>Looks like there is no data</div>
          <Button className="px-3" onClick={onAddData}>
            Add Data
          </Button>
        </div>
      )}
    </div>
  );
};

export default Table;
