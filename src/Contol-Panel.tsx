import { Box, Button, FormControl, TextField, Typography } from '@mui/material';
import { useRecoilState } from 'recoil';
import { tagsState, endpointData } from './services/atoms'
import { EndpointDataTyp, TagsStateType, plusOrMinusSigns, sortByEnum, sortOrderEnum } from './services/enums';
import { ArrowDownward, ArrowUpward, FirstPage, LastPage, RemoveCircleOutline } from '@mui/icons-material'
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { useState } from 'react';


export function ControlPanelComponent() {
    const [tagsData] = useRecoilState<TagsStateType>(tagsState);
    const [endpoint, setEndpoint] = useRecoilState<EndpointDataTyp>(endpointData);
    const [pageSizeError, setPageSizeError] = useState<string | null>(null);
    const [pageNumberError, setPageNumberError] = useState<string | null>(null);
    const [notANumberError, setNotANumber] = useState<string | null>(null);
    const [localPageSize, setLocalPageSize] = useState(endpoint.pagesize);
    const [pressIntervalId, setPressIntervalId] = useState<NodeJS.Timeout | null>(null);
    const [buttonPressedFlag, setButtonPressedFlag] =useState(false);

    const errorOrLoading = tagsData.loading || tagsData.error != null;
    let inputTimeoutId: ReturnType<typeof setTimeout>;

    const buttonRoundedStyle = {
        borderRadius: '30px',
        flex: 'inline-flex',
        padding: '5',
        minWidth: '30px'
    };

    const smallButton = {
        height: '20px',
        minWidth: '20px'
    };

    const boxShadowStyle = {
        boxShadow: '2px 2px 6px 0px rgba(0, 0, 0, 0.4)',
        textShadow: '2px 2px 6px rgba(66, 68, 90, 0.4)'
    }

    const toggleSortOrder = () => {
        const newOrder = endpoint.order === sortOrderEnum.desc ? sortOrderEnum.asc : sortOrderEnum.desc;
        setEndpoint({ ...endpoint, order: newOrder });
    };

    const toggleSortBy = () => {
        const newSortBy = endpoint.sortBy === sortByEnum.popular ? sortByEnum.name : sortByEnum.popular;
        setEndpoint({ ...endpoint, sortBy: newSortBy });
    };

    const handlePageSizeChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, manualInput = false) => {
        if(inputTimeoutId != null){
            clearTimeout(inputTimeoutId);
        }

        let value = parseInt(event.target.value);

        if (isNaN(value)) {
            setNotANumber("Numer strony musi być liczbą");
            return;
        } else {
            setNotANumber(null);
        }

        if (value < 1) {
            value = 1;
        } else if (value > 100) {
            value = 100;
            setPageSizeError("Maksymalna wielkość strony to 100");
        } else {
            setPageSizeError(null);
        }

        if (manualInput) {
            setLocalPageSize(value);
        }
        inputTimeoutId = setTimeout(() => {
            setEndpoint(prevState => ({ ...prevState, pagesize: value }));
        }, 500);
    };

    const goToPage = (page: number) => {
        if (page - 1 > 0 || page + 1 < 25) {
            setEndpoint({ ...endpoint, page: page });
        }
        if (page === 25) {
            setPageNumberError("25 to maksymalna obsługiwana strona")
        } else {
            setPageNumberError(null)
        }
    };

    const startPress = (speed = 800, sign: plusOrMinusSigns, pageSizeValue: number) => {
        setButtonPressedFlag(true);
        let intervalCount = 0;

        let intervalId = setInterval(() => {
            if (sign === plusOrMinusSigns.plus) {
                pageSizeValue++;
                setLocalPageSize(prev => prev + 1);
            } else {
                pageSizeValue--;
                setLocalPageSize(prev => prev - 1);
            }

            if (pageSizeValue >= 100 || pageSizeValue <= 1) {
                clearInterval(intervalId);
                endPress();
                return true;
            }

            intervalCount++;
            if (intervalCount === 1 && speed > 100) {
                intervalCount = 0;
                clearInterval(intervalId);
                if (pressIntervalId !== null) {
                    clearInterval(pressIntervalId);
                }
                startPress(speed - 100, sign, pageSizeValue);
            }
        }, speed);
        setPressIntervalId(intervalId);
    };

    const endPress = () => {
        if (pressIntervalId !== null) {
            clearInterval(pressIntervalId);
            setPressIntervalId(null);
        }
        setPressIntervalId(null);

        setEndpoint(prevEndpoint => ({ ...prevEndpoint, pagesize: localPageSize }))
        setButtonPressedFlag(false)
    };

    let pageClickTiemout: ReturnType<typeof setTimeout>;

    const changeSinglePage = (sign: plusOrMinusSigns) => {
        if (sign === plusOrMinusSigns.plus) {
            setLocalPageSize((prev) => prev + 1);
            setEndpoint((prevEndpoint) => ({ ...prevEndpoint, pagesize: prevEndpoint.pagesize + 1 }));
        }
        if (sign === plusOrMinusSigns.minus) {
            setLocalPageSize((prev) => prev - 1);
            setEndpoint((prevEndpoint) => ({ ...prevEndpoint, pagesize: prevEndpoint.pagesize - 1 }));
        }
    }

    return (
        <div className='Top-container'>
            <div className='control-panel box-shadow'>
                <Box sx={{ padding: '20px' }}>
                    <h3 className='text-style'>Panel Kontrolny</h3>
                    <div className='control-panel-buttons'>
                        <FormControl variant="standard">
                            <div className='control-panel-buttons'>
                                <label className="control-label text-style ">Kolejność:</label>
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
                            <div className='control-panel-buttons'>
                                <label className="control-label text-style ">Sortowanie:</label>
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
                                <label className="control-label text-style ">Wielkość strony:</label>
                                <Button
                                    sx={buttonRoundedStyle}
                                    disabled={localPageSize <= 1 || tagsData.error != null}
                                    onClick={() => changeSinglePage(plusOrMinusSigns.minus)}
                                    onMouseDown={() => startPress(750, plusOrMinusSigns.minus, localPageSize)}
                                    onMouseUp={endPress}
                                    onMouseLeave={() => {if (buttonPressedFlag) {endPress()}}}
                                    onContextMenu={() => {if (buttonPressedFlag) {endPress()}}}>
                                    <RemoveCircleOutline />
                                </Button>
                                <TextField
                                    sx={{ maxWidth: '3.2rem' }}
                                    size="small"
                                    disabled={errorOrLoading}
                                    variant="outlined"
                                    value={localPageSize.toString()}
                                    onChange={(event) => {
                                        handlePageSizeChange(event, true);
                                    }}
                                />
                                <Button
                                    sx={buttonRoundedStyle}
                                    disabled={localPageSize >= 100 || tagsData.error != null}
                                    onClick={() => changeSinglePage(plusOrMinusSigns.plus)}
                                    onMouseDown={() => startPress(750, plusOrMinusSigns.plus, localPageSize)}
                                    onMouseUp={endPress}
                                    onMouseLeave={() => {if (buttonPressedFlag) {endPress()}}}
                                    onContextMenu={() => {if (buttonPressedFlag) {endPress()}}}>
                                    <AddCircleOutlineIcon />
                                </Button>
                            </div>
                        </FormControl>
                    </div>
                </Box>
                <Box>
                    <div className='control-panel-buttons'>
                        <FormControl sx={{ display: "flex", alignItems: "center", flexDirection: "row", justifyContent: "space-evenly" }}>
                            <div className='base-container'>
                                <label className="control-label" style={{ paddingRight: '0px' }}>Strona:</label>
                                <Button
                                    sx={buttonRoundedStyle}
                                    disabled={endpoint.page === 1 || errorOrLoading}
                                    onClick={() => goToPage(1)}>
                                    <FirstPage />
                                </Button>
                                <Button
                                    sx={buttonRoundedStyle}
                                    disabled={endpoint.page === 1 || errorOrLoading}
                                    onClick={() => goToPage(endpoint.page - 1)}>
                                    <ArrowBackIosNewIcon />
                                </Button>
                                {endpoint.page - 2 > 0 && (<Button
                                    sx={{ ...buttonRoundedStyle, ...smallButton }}
                                    disabled={endpoint.pagesize < 1 || endpoint.pagesize > 100 || errorOrLoading}
                                    onClick={() => goToPage(endpoint.page - 2)}>
                                    <p className='text-style'>{endpoint.page - 2}</p>
                                </Button>
                                )}
                                {endpoint.page - 1 > 0 && (<Button
                                    sx={{ ...buttonRoundedStyle, ...smallButton }}
                                    disabled={endpoint.pagesize < 1 || endpoint.pagesize > 100 || errorOrLoading}
                                    onClick={() => goToPage(endpoint.page - 1)}>
                                    <p className='text-style'>{endpoint.page - 1}</p>
                                </Button>
                                )}
                                <p className='text-style'>{endpoint.page}</p>
                                {endpoint.page + 1 <= 25 && (<Button
                                    sx={{ ...buttonRoundedStyle, ...smallButton }}
                                    disabled={endpoint.page === 25 || endpoint.pagesize < 1 || endpoint.pagesize > 100 || errorOrLoading}
                                    onClick={() => goToPage(endpoint.page + 1)}>
                                    <p className='text-style'>{endpoint.page + 1}</p>
                                </Button>
                                )}
                                {endpoint.page + 2 <= 25 && (<Button
                                    sx={{ ...buttonRoundedStyle, ...smallButton }}
                                    disabled={endpoint.page === 25 || endpoint.pagesize < 1 || endpoint.pagesize > 100 || errorOrLoading}
                                    onClick={() => goToPage(endpoint.page + 2)}>
                                    <p className='text-style'>{endpoint.page + 2}</p>
                                </Button>
                                )}
                                <Button
                                    sx={buttonRoundedStyle}
                                    disabled={endpoint.page === 25 || endpoint.pagesize < 1 || endpoint.pagesize > 100 || errorOrLoading}
                                    onClick={() => goToPage(endpoint.page + 1)}>
                                    <ArrowForwardIosIcon />
                                </Button>
                                <Button
                                    sx={buttonRoundedStyle}
                                    disabled={endpoint.page === 25 || endpoint.pagesize < 1 || endpoint.pagesize > 100 || errorOrLoading}
                                    onClick={() => goToPage(25)}>
                                    <LastPage />
                                </Button>
                            </div>
                        </FormControl>
                    </div>
                </Box>
                <div className='control-errors'>
                    {pageSizeError && (
                        <Typography variant="caption" color="error">
                            {pageSizeError}
                        </Typography>
                    )}
                    {pageNumberError && (
                        <Typography variant="caption" color="warning.main">
                            {pageNumberError}
                        </Typography>
                    )}
                    {notANumberError && (
                        <Typography variant="caption" color="error">
                            {notANumberError}
                        </Typography>
                    )}
                </div>
            </div>
        </div>
    )
}