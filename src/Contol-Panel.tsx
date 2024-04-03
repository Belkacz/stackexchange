import { Box, Button, FormControl, TextField } from '@mui/material';
import { useRecoilState } from 'recoil';
import { tagsState, endpointData } from './services/atoms'
import { EndpointDataTyp, TagsStateType, sortByEnum, sortOrderEnum } from './services/enums';
import { ArrowDownward, ArrowUpward } from '@mui/icons-material'
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';


export function ControlPanelComponent() {
    const [tagsData] = useRecoilState<TagsStateType>(tagsState);
    const [endpoint, setEndpoint] = useRecoilState<EndpointDataTyp>(endpointData);

    const errorOrLoading = tagsData.loading || tagsData.error != null;

    const toggleSortOrder = () => {
        const newOrder = endpoint.order === sortOrderEnum.desc ? sortOrderEnum.asc : sortOrderEnum.desc;
        setEndpoint({ ...endpoint, order: newOrder });
    };

    const toggleSortBy = () => {
        const newSortBy = endpoint.sortBy === sortByEnum.popular ? sortByEnum.name : sortByEnum.popular;
        setEndpoint({ ...endpoint, sortBy: newSortBy });
    };

    const handlePageSizeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setTimeout(() => {
            const pageSize = parseInt(event.target.value);
            setEndpoint({ ...endpoint, pagesize: pageSize });
        }, 1000)
    };

    const goToPage = (page: number) => {
        setEndpoint({ ...endpoint, page: page });
    };


    const buttonRoundedStyle = {
        borderRadius: '30px',
        flex: 'inline-flex'
    };

    const boxShadowStyle = {
        boxShadow: '2px 2px 6px 0px rgba(0, 0, 0, 0.4)',
        textShadow: '2px 2px 6px rgba(66, 68, 90, 0.4)'
    }

    return (
        <div className='Top-container'>
            <div className='control-panel box-shadow'>
                <Box sx={{ padding: '20px' }}>
                    <h3 className='text-shadow'>Panel Kontrolny</h3>
                    <div className='control-panel-buttons'>
                        <FormControl variant="standard">
                            <div className='control-panel-buttons'>
                                <label className="control-label text-shadow ">Kolejność:</label>
                                <Button variant="contained"
                                    sx={boxShadowStyle}
                                    disabled={errorOrLoading}
                                    onClick={toggleSortOrder}>
                                    {endpoint.order === sortOrderEnum.desc ? "Malejąca " : "Rosnąca "}
                                    {endpoint.order === sortOrderEnum.desc ?
                                        <ArrowDownward sx={{ fontSize: 15 }} /> :
                                        <ArrowUpward sx={{ fontSize: 15 }} />}
                                </Button>
                            </div>
                            <div>
                                <label className="control-label text-shadow ">Sortowanie:</label>
                                <Button variant="contained"
                                    sx={boxShadowStyle}
                                    disabled={errorOrLoading}
                                    onClick={toggleSortBy}>
                                    {endpoint.sortBy === sortByEnum.name ? "Nazwą" : "Popularnością"}</Button>
                            </div>
                        </FormControl>
                    </div>
                </Box>
                <Box>
                    <div className='control-panel-buttons'>
                        <FormControl sx={{ display: "flex", alignItems: "center", flexDirection: "row", justifyContent: "space-evenly" }}>
                            <div className='control-panel-buttons'>
                                <label className="control-label text-shadow ">Wielkość strony:</label>
                                <TextField
                                    sx={{ maxWidth: '5rem' }}
                                    size="small"
                                    disabled={errorOrLoading}
                                    type="number"
                                    variant="outlined"
                                    defaultValue={endpoint.pagesize.toString()}
                                    onChange={handlePageSizeChange}
                                />
                            </div>
                            <div className='base-container'>
                                <label className="control-label">Strona:</label>
                                <Button sx={buttonRoundedStyle}
                                    disabled={endpoint.page === 1 || errorOrLoading}
                                    onClick={() => goToPage(endpoint.page - 1)}>
                                    <ArrowBackIosNewIcon></ArrowBackIosNewIcon>
                                </Button>

                                <p className='text-shadow'>{endpoint.page}</p>
                                <Button sx={buttonRoundedStyle}
                                    disabled={endpoint.page === 25 || errorOrLoading}
                                    onClick={() => goToPage(endpoint.page + 1)}>
                                    <ArrowForwardIosIcon></ArrowForwardIosIcon>
                                </Button>
                            </div>
                        </FormControl>
                    </div>
                </Box>
            </div>
        </div>
    )
}