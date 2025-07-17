import NumbersRoundedIcon from '@mui/icons-material/NumbersRounded';
import AccessTimeRoundedIcon from '@mui/icons-material/AccessTimeRounded';
import AbcRoundedIcon from '@mui/icons-material/AbcRounded';
import ScatterPlotRoundedIcon from '@mui/icons-material/ScatterPlotRounded';
import ArchitectureRoundedIcon from '@mui/icons-material/ArchitectureRounded';

const convertToMap = <T extends readonly string[], V>(keys: T, val: V) =>
    Object.fromEntries(keys.map(k => [k, val])) as Record<T[number], V>

export const DataTypeIcon = {
    ...convertToMap(['tinyint', 'smallint', 'mediumint', 'int', 'integer', 'bigint', 'decimal', 'numeric', 'float', 'double'],
        <NumbersRoundedIcon />),
    ...convertToMap(['date', 'datetime', 'timestamp', 'time', 'year'],
        <AccessTimeRoundedIcon />),
    ...convertToMap(['char', 'varchar', 'tinytext', 'text', 'mediumtext', 'longtext', 'json', 'enum', 'set'],
        <AbcRoundedIcon />),
    ...convertToMap(['binary', 'varbinary', 'tinyblob', 'blob', 'mediumblob', 'longblob'],
        <ScatterPlotRoundedIcon />),
         ...convertToMap(['geometry', 'point', 'linestring', 'polygon', 'multipoint', 'multilinestring', 'multipolygon'],
        <ArchitectureRoundedIcon />),
}