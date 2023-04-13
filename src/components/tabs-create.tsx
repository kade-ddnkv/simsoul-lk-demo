import * as React from 'react';
import { Button, Grid, TextField, Tabs, Tab, Box, Typography, Divider, styled } from '@mui/material';
import { Radio, RadioGroup, MenuItem, FormControlLabel, Checkbox } from '@mui/material';
import CheckBoxOutlineBlankSharpIcon from '@mui/icons-material/CheckBoxOutlineBlankSharp';
import CheckBoxSharpIcon from '@mui/icons-material/CheckBoxSharp';
import { useMediaQuery, useTheme } from '@mui/material';
import { alpha } from "@mui/material";
import { useRouter } from 'next/router';
import Geography from './geography';
import { HeaderText, StyledButton } from './generalComponents';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

const StyledTab = styled(Tab)({
  ml: 4,
  minWidth: '180px',
  "&.Mui-selected": {
    color: "black",
    backgroundColor: "#f2f2f2"
  },
  "&.Mui-disabled": {
    fontWeight: "bold",
    color: "black",
  }
})

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ pl: 5, pt: 2 }}>
          {/* <Typography>{children}</Typography> */}
          {children}
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `vertical-tab-${index}`,
    'aria-controls': `vertical-tabpanel-${index}`,
  };
}

const StyledTextField = styled(TextField)({
  // input label when focused
  "& label.Mui-focused": {
    color: 'black'
  },
  // focused color for input with variant='standard'
  "& .MuiInput-underline:after": {
    borderBottomColor: 'black'
  },
  // focused color for input with variant='filled'
  "& .MuiFilledInput-underline:after": {
    borderBottomColor: 'black'
  },
  // focused color for input with variant='outlined'
  "& .MuiOutlinedInput-root": {
    "&.Mui-focused fieldset": {
      borderColor: 'black'
    }
  }
});

const BoxInsideRadio = styled(Box)({
  marginLeft: '31px',
  marginBottom: '48px',
})

const BackButton = (props) => (
  <Button onClick={props.onClick} variant='outlined' sx={{
    width: '100%',
    borderColor: 'black',
    borderRadius: 0,
    color: 'black',
    ':hover': {
      backgroundColor: '#f0f0f0',
      borderColor: 'black',
    }
  }}>{props.children}</Button>
)

const ProceedButton = (props) => (
  <Button onClick={props.onClick} variant='outlined' sx={{
    width: '100%',
    borderColor: 'black',
    borderRadius: 0,
    borderWidth: 2,
    color: 'black',
    ':hover': {
      borderWidth: 2,
      backgroundColor: 'black',
      color: 'white',
      borderColor: 'black',
    }
  }}>{props.children}</Button>
)

export default function TabsCreate() {
  const [tabValue, setTabValue] = React.useState(1);
  const router = useRouter();

  const handleTabChange = (event: React.SyntheticEvent, newTabValue: number) => {
    setTabValue(newTabValue);
  };

  function onBackClick() {
    if (tabValue === 1) {
      router.push('/')
    } else {
      setTabValue(tabValue - 1)
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  function onProceedClick() {
    if (tabValue === 7) {

    } else {
      setTabValue(tabValue + 1)
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  const ButtonsAtBottom = () => (
    <Grid item xs={12} sx={{ mt: 4, mb: 6 }}>
      <Grid container columnSpacing={1} sx={{ display: 'flex', alignItems: 'center' }}>
        <Grid item lg={1}>
          <BackButton onClick={onBackClick}>Back</BackButton>
        </Grid>
        <Grid item lg={2}>
          <ProceedButton onClick={onProceedClick}>Proceed</ProceedButton>
        </Grid>
      </Grid>
    </Grid >
  )

  const [selectedRadio, setSelectedRadio] = React.useState('nothing');

  function RadioSliceTab() {
    const theme = useTheme();
    const isLg = useMediaQuery(theme.breakpoints.up('lg'));

    const handleRadioChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      setSelectedRadio((event.target as HTMLInputElement).value);
    };

    return (
      <Box
        component="form"
        sx={{ width: '100%', }}
        noValidate
        autoComplete="off"
      >
        <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
          <Grid item xs={12}>
            <HeaderText>Radio slice</HeaderText>
          </Grid>
          <Grid item xs={12}>
            <Typography>Select one of 4 options</Typography>
          </Grid>
          <Grid item xs={12} lg={2} />
          <Grid item xs={12} lg={7}>
            <RadioGroup
              name="which-radio-radio-buttons-group"
              value={selectedRadio}
              onChange={handleRadioChange}
            >
              <FormControlLabel value="per_slice" control={<Radio style={{ color: 'black' }} />} label={<Typography sx={{ fontWeight: 'bold' }}>Bandwidth + Latency per slice</Typography>} />
              <BoxInsideRadio>
                <Typography>I want guaranteed bandwidth to all my devices.</Typography>
                <Box sx={selectedRadio !== 'per_slice' ? { '& .MuiTypography-root': { color: alpha('#000000', 0.38) } } : {}}>
                  <Box>
                    <Grid container rowSpacing={1} columnSpacing={{ xs: 1 }} sx={{ mt: 2, display: 'flex', alignItems: 'center' }}>
                      <Grid item xs={12} lg={2} />
                      <Grid item xs={12} lg={4}>
                        <Typography>Bandwidth</Typography>
                      </Grid>
                      <Grid item xs={12} lg={4}>
                        <StyledTextField disabled={selectedRadio !== 'per_slice'}
                          sx={{ width: '100%' }}
                          size="small"
                          label="Gbps"
                          defaultValue="300"
                          variant="outlined"
                        />
                      </Grid>
                    </Grid>
                  </Box>
                  <Box>
                    <Grid container rowSpacing={1} columnSpacing={{ xs: 1 }} sx={{ mt: 2, display: 'flex', alignItems: 'center' }}>
                      <Grid item xs={12} lg={2} />
                      <Grid item xs={12} lg={4}>
                        <Typography>Max number of devices (estimated)</Typography>
                      </Grid>
                      <Grid item xs={12} lg={4}>
                        <StyledTextField disabled
                          sx={{ width: '100%' }}
                          size="small"
                          label="Gbps"
                          defaultValue="300"
                          variant="outlined"
                        />
                      </Grid>
                    </Grid>
                  </Box>
                </Box>
              </BoxInsideRadio>
              <FormControlLabel value="per_device" control={<Radio style={{ color: 'black' }} />} label={<Typography sx={{ fontWeight: 'bold' }}>Bandwidth + Latency per device</Typography>} />
              <BoxInsideRadio>
                <Typography>I want guaranteed bandwidth and latency for each of my devices.</Typography>
                <Box sx={selectedRadio !== 'per_device' ? { '& .MuiTypography-root': { color: alpha('#000000', 0.38) } } : {}}>
                  <Box>
                    <Grid container rowSpacing={1} columnSpacing={{ xs: 1 }} sx={{ mt: 2, display: 'flex', alignItems: 'center' }}>
                      <Grid item xs={12} lg={2} />
                      <Grid item xs={12} lg={4}>
                        <Typography>Number of devices</Typography>
                      </Grid>
                      <Grid item xs={12} lg={4}>
                        <StyledTextField disabled={selectedRadio !== 'per_device'}
                          sx={{ width: '100%' }}
                          size="small"
                          label="Number"
                          defaultValue="1000"
                          variant="outlined"
                        />
                      </Grid>
                    </Grid>
                  </Box>
                  <Box>
                    <Grid container rowSpacing={1} columnSpacing={{ xs: 1 }} sx={{ mt: 2, display: 'flex', alignItems: 'center' }}>
                      <Grid item xs={12} lg={2} />
                      <Grid item xs={12} lg={4}>
                        <Typography>Bandwidth for each device</Typography>
                      </Grid>
                      <Grid item xs={12} lg={4}>
                        <StyledTextField disabled={selectedRadio !== 'per_device'}
                          sx={{ width: '100%' }}
                          size="small"
                          label="Gbps"
                          defaultValue="300"
                          variant="outlined"
                        />
                      </Grid>
                    </Grid>
                  </Box>
                </Box>
              </BoxInsideRadio>
              <FormControlLabel value="density" control={<Radio style={{ color: 'black' }} />} label={<Typography sx={{ fontWeight: 'bold' }}>Density</Typography>} />
              <BoxInsideRadio>
                <Typography>I want a guaranteed connection of a large number of my devices with minimal traffic.</Typography>
                <Box sx={selectedRadio !== 'density' ? { '& .MuiTypography-root': { color: alpha('#000000', 0.38) } } : {}}>
                  <Box>
                    <Grid container rowSpacing={1} columnSpacing={{ xs: 1 }} sx={{ mt: 2, display: 'flex', alignItems: 'center' }}>
                      <Grid item xs={12} lg={2} />
                      <Grid item xs={12} lg={4}>
                        <Typography>Number of devices</Typography>
                      </Grid>
                      <Grid item xs={12} lg={4}>
                        <StyledTextField disabled={selectedRadio !== 'density'}
                          sx={{ width: '100%' }}
                          size="small"
                          label="Number"
                          defaultValue="100500"
                          variant="outlined"
                        />
                      </Grid>
                    </Grid>
                  </Box>
                  <Box>
                    <Grid container rowSpacing={1} columnSpacing={{ xs: 1 }} sx={{ mt: 2, display: 'flex', alignItems: 'center' }}>
                      <Grid item xs={12} lg={2} />
                      <Grid item xs={12} lg={4}>
                        <Typography>Bandwidth for each device</Typography>
                      </Grid>
                      <Grid item xs={12} lg={4}>
                        <StyledTextField disabled={selectedRadio !== 'density'}
                          sx={{ width: '100%' }}
                          size="small"
                          select
                          label="Select"
                          defaultValue="best_effort"
                        >
                          <MenuItem key='best_effort' value='best_effort'>best effort</MenuItem>
                          <MenuItem key='100Mbps' value='100Mbps'>100Mbps</MenuItem>
                        </StyledTextField>
                      </Grid>
                    </Grid>
                  </Box>
                </Box>
              </BoxInsideRadio>
              <FormControlLabel value="nothing" control={<Radio style={{ color: 'black' }} />} label={
                <Typography sx={{ fontWeight: 'bold' }}>I don't need a radio slice</Typography>
              } />
              <Box sx={{ mb: 2 }}></Box>
            </RadioGroup>
          </Grid>
          <ButtonsAtBottom />
        </Grid>
      </Box>
    )
  }

  const [selectedCore, setSelectedCore] = React.useState('nothing');
  const [selectedTraffic, setSelectedTraffic] = React.useState('public');
  const [selectedFallback, setSelectedFallback] = React.useState('nothing');
  const [selectedTransferCore, setSelectedTransferCore] = React.useState('operator');

  function isCoreWithVpnActive() {
    return (selectedCore === 'operator' || selectedCore === 'local') && selectedTraffic === 'VPN';
  }

  function isTransferCoreActive() {
    return selectedCore === 'transfer';
  }

  function CoreSliceTab() {
    const theme = useTheme();
    const isLg = useMediaQuery(theme.breakpoints.up('lg'));

    const handleCoreChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      setSelectedCore((event.target as HTMLInputElement).value);
    };

    const handleTrafficChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      setSelectedTraffic((event.target as HTMLInputElement).value);
    };

    const handleFallbackChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      setSelectedFallback((event.target as HTMLInputElement).value);
    };

    const handleTransferCoreChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      setSelectedTransferCore((event.target as HTMLInputElement).value);
    };

    function isTrafficActive() {
      return selectedCore === 'operator' || selectedCore === 'local';
    }

    function isFallbackActive() {
      return (selectedCore === 'operator' || selectedCore === 'local') && selectedTraffic === 'VPN'
        || selectedCore === 'transfer';
    }

    return (
      <Box
        component="form"
        sx={{ width: '100%', }}
        noValidate
        autoComplete="off"
      >
        <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
          <Grid item xs={12}>
            <HeaderText>Core slice</HeaderText>
          </Grid>
          <Grid item xs={12}>
            <Typography>Select one of 4 options</Typography>
          </Grid>
          <Grid item xs={12} lg={2} />
          <Grid item xs={12} lg={7}>
            <RadioGroup
              name="which-core-radio-buttons-group"
              value={selectedCore}
              onChange={handleCoreChange}
            >
              <FormControlLabel value="operator" control={<Radio style={{ color: 'black' }} />} label={
                <Typography sx={{ fontWeight: 'bold' }}>Allocated resources on the operator's side, under the operator's control.</Typography>
              } />
              <Box sx={{ mb: 3 }}></Box>
              {/* <BoxInsideRadio>
                <Box sx={selectedCore !== 'operator' ? { '& .MuiTypography-root': { color: alpha('#000000', 0.38) } } : {}}>
                  <Box>
                    <Grid container rowSpacing={1} columnSpacing={{ xs: 1 }} sx={{ mt: 2 }}>
                      <Grid item xs={12} lg={1} />
                      <Grid item xs={12} lg={3} sx={{ mt: 1 }}>
                        <Typography>Data plane goes</Typography>
                      </Grid>
                      <Grid item xs={12} lg={8}>
                        <RadioGroup
                          name="traffic-operator-radio-buttons-group"
                          value={selectedTrafficOperator}
                          onChange={handleTrafficOperatorChange}
                        >
                          <FormControlLabel disabled={selectedCore !== 'operator'} value="public" control={<Radio style={{ color: 'black' }} />} label={
                            <Typography sx={{ fontWeight: 'bold' }}>to public</Typography>
                          } />
                          <FormControlLabel disabled={selectedCore !== 'operator'} value="VPN" control={<Radio style={{ color: 'black' }} />} label={
                            <Typography sx={{ fontWeight: 'bold' }}>to VPN</Typography>
                          } />
                          <BoxInsideRadio sx={selectedTrafficOperator !== 'VPN' ? { '& .MuiTypography-root': { color: alpha('#000000', 0.38) } } : {}}>
                            <Box>
                              <Grid container rowSpacing={1} columnSpacing={{ xs: 1 }} sx={{ mt: 2, display: 'flex', alignItems: 'center' }}>
                                <Grid item xs={12} lg={1} />
                                <Grid item xs={12} lg={3}>
                                  <Typography>Address</Typography>
                                </Grid>
                                <Grid item xs={12} lg={8}>
                                  <StyledTextField disabled={selectedTrafficOperator !== 'VPN'}
                                    sx={{ width: '100%' }}
                                    size="small"
                                    label="Address"
                                    defaultValue="0.0.0.0:3000"
                                    variant="outlined"
                                  />
                                </Grid>
                              </Grid>
                            </Box>
                            <Box>
                              <Grid container rowSpacing={1} columnSpacing={{ xs: 1 }} sx={{ mt: 2, display: 'flex', alignItems: 'center' }}>
                                <Grid item xs={12} lg={1} />
                                <Grid item xs={12} lg={3}>
                                  <Typography>Credentials</Typography>
                                </Grid>
                                <Grid item xs={12} lg={8}>
                                  <StyledTextField disabled={selectedTrafficOperator !== 'VPN'}
                                    sx={{ width: '100%' }}
                                    size="small"
                                    label="Username"
                                    variant="outlined"
                                  />
                                </Grid>
                                <Grid item xs={12} lg={1} />
                                <Grid item xs={12} lg={3} />
                                <Grid item xs={12} lg={8}>
                                  <StyledTextField disabled={selectedTrafficOperator !== 'VPN'}
                                    sx={{ width: '100%' }}
                                    size="small"
                                    label="Password"
                                    variant="outlined"
                                  />
                                </Grid>
                                <Grid item xs={12} lg={1} />
                                <Grid item xs={12} lg={11} sx={{ mt: 3 }}>
                                  <Typography sx={{ fontWeight: 'bold' }}>Fallback scenario</Typography>
                                </Grid>
                                <Grid item xs={12} lg={1} />
                                <Grid item xs={12} lg={3} />
                                <Grid item xs={12} lg={8} sx={{ mt: 3 }}>
                                  <RadioGroup
                                    name="fallback-operator-radio-buttons-group"
                                    value={selectedFallbackOperator}
                                    onChange={handleFallbackOperatorChange}
                                  >
                                    <FormControlLabel disabled={selectedTrafficOperator !== 'VPN'} value="public" control={<Radio style={{ color: 'black' }} />} label={
                                      <Typography sx={{ fontWeight: 'bold' }}>to public</Typography>
                                    } />
                                    <FormControlLabel disabled={selectedTrafficOperator !== 'VPN'} value="VPN" control={<Radio style={{ color: 'black' }} />} label={
                                      <Typography sx={{ fontWeight: 'bold' }}>to VPN</Typography>
                                    } />
                                    <BoxInsideRadio sx={selectedTrafficOperator !== 'VPN' ? { '& .MuiTypography-root': { color: alpha('#000000', 0.38) } } : {}}>
                                      <Box>
                                        <Grid container rowSpacing={1} columnSpacing={{ xs: 1 }} sx={{ mt: 2, display: 'flex', alignItems: 'center' }}>
                                          <Grid item xs={12}>
                                            <Typography>Address</Typography>
                                          </Grid>
                                          <Grid item xs={12}>
                                            <StyledTextField disabled={selectedTrafficOperator !== 'VPN'}
                                              sx={{ width: '100%' }}
                                              size="small"
                                              label="Address"
                                              defaultValue="0.0.0.0:3000"
                                              variant="outlined"
                                            />
                                          </Grid>
                                        </Grid>
                                      </Box>
                                      <Box>
                                        <Grid container rowSpacing={1} columnSpacing={{ xs: 1 }} sx={{ mt: 2, display: 'flex', alignItems: 'center' }}>
                                          <Grid item xs={12}>
                                            <Typography>Credentials</Typography>
                                          </Grid>
                                          <Grid item xs={12}>
                                            <StyledTextField disabled={selectedTrafficOperator !== 'VPN'}
                                              sx={{ width: '100%' }}
                                              size="small"
                                              label="Username"
                                              variant="outlined"
                                            />
                                          </Grid>
                                          <Grid item xs={12}>
                                            <StyledTextField disabled={selectedTrafficOperator !== 'VPN'}
                                              sx={{ width: '100%' }}
                                              size="small"
                                              label="Password"
                                              variant="outlined"
                                            />
                                          </Grid>
                                        </Grid>
                                      </Box>
                                    </BoxInsideRadio>
                                    <FormControlLabel disabled={selectedTrafficOperator !== 'VPN'} value="nothing" control={<Radio style={{ color: 'black' }} />} label={
                                      <Typography sx={{ fontWeight: 'bold' }}>do nothing</Typography>
                                    } />
                                  </RadioGroup>
                                </Grid>
                              </Grid>
                            </Box>
                          </BoxInsideRadio>
                        </RadioGroup>
                      </Grid>
                    </Grid>
                  </Box>
                </Box>
              </BoxInsideRadio> */}
              <FormControlLabel value="local" control={<Radio style={{ color: 'black' }} />} label={
                <Typography sx={{ fontWeight: 'bold' }}>Allocated resources in the local (operator's) data center.</Typography>
              } />
              <BoxInsideRadio>
                <Box sx={selectedCore !== 'local' ? { '& .MuiTypography-root': { color: alpha('#000000', 0.38) } } : {}}>
                  <Grid container rowSpacing={1} columnSpacing={{ xs: 1 }} sx={{ mt: 2, display: 'flex', alignItems: 'center' }}>
                    <Grid item xs={12} lg={2} />
                    <Grid item xs={12} lg={4}>
                      <Typography>Select data center</Typography>
                    </Grid>
                    <Grid item xs={12} lg={6}>
                      <StyledTextField disabled={selectedCore !== 'local'}
                        sx={{ width: '100%' }}
                        size="small"
                        select
                        label="Select"
                        defaultValue="1"
                      >
                        <MenuItem key='nearest' value='nearest'>Nearest</MenuItem>
                        <MenuItem key='1' value='1'>221B Baker Street, London</MenuItem>
                      </StyledTextField>
                    </Grid>
                  </Grid>
                </Box>
              </BoxInsideRadio>
              <FormControlLabel value="transfer" control={<Radio style={{ color: 'black' }} />} label={
                <Typography sx={{ fontWeight: 'bold' }}>Transfer some core resources to the my local platform.</Typography>
              } />
              <BoxInsideRadio>
                <Box sx={selectedCore !== 'transfer' ? { '& .MuiTypography-root': { color: alpha('#000000', 0.38) } } : {}}>
                  <Grid container rowSpacing={1} columnSpacing={{ xs: 1 }} sx={{ mt: 1 }}>
                    <Grid item xs={12} lg={2} />
                    <Grid item xs={12} lg={4} sx={{ mt: 1 }}>
                      <Typography>Which core will be used?</Typography>
                    </Grid>
                    <Grid item xs={12} lg={6}>
                      <RadioGroup
                        name="fallback-operator-radio-buttons-group"
                        value={selectedTransferCore}
                        onChange={handleTransferCoreChange}
                      >
                        <FormControlLabel disabled={selectedCore !== 'transfer'} value="operator" control={
                          <Radio style={selectedCore === 'transfer' ? { color: 'black' } : {}} />
                        } label={
                          <Typography sx={{ fontWeight: 'bold' }}>Download and use operator's core</Typography>
                        } />
                        <FormControlLabel disabled={selectedCore !== 'transfer'} value="own" control={
                          <Radio style={selectedCore === 'transfer' ? { color: 'black' } : {}} />
                        } label={
                          <Typography sx={{ fontWeight: 'bold' }}>Use my own 3GPP-compatible core</Typography>
                        } />
                      </RadioGroup>
                    </Grid>
                  </Grid>
                </Box>
              </BoxInsideRadio>
              <FormControlLabel value="nothing" control={<Radio style={{ color: 'black' }} />} label={
                <Typography sx={{ fontWeight: 'bold' }}>I don't need a core slice</Typography>
              } />
            </RadioGroup>
          </Grid>
        </Grid>
        <Box sx={!isTrafficActive() ? {
          '& .MuiTypography-root': { color: alpha('#000000', 0.38) },
          // '& .MuiRadio-root': {color: alpha('#000000', 0.38)},
        } : {}}>
          <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
            <Grid item xs={12} sx={{ mt: 10 }}>
              <HeaderText>Traffic management</HeaderText>
            </Grid>
            <Grid item xs={12}>
              <Typography>Data plane goes</Typography>
            </Grid>
            <Grid item xs={12} lg={2} />
            <Grid item xs={12} lg={7}>
              <RadioGroup
                name="traffic-operator-radio-buttons-group"
                value={selectedTraffic}
                onChange={handleTrafficChange}
              >
                <FormControlLabel disabled={!isTrafficActive()} value="public" control={
                  <Radio style={isTrafficActive() ? { color: 'black' } : {}} />
                } label={
                  <Typography sx={{ fontWeight: 'bold' }}>to public</Typography>
                } />
                <FormControlLabel disabled={!isTrafficActive()} value="VPN" control={
                  <Radio style={isTrafficActive() ? { color: 'black' } : {}} />
                } label={
                  <Typography sx={{ fontWeight: 'bold' }}>to VPN</Typography>
                } />
                <BoxInsideRadio sx={selectedTraffic !== 'VPN' ? { '& .MuiTypography-root': { color: alpha('#000000', 0.38) } } : {}}>
                  <Box>
                    <Grid container rowSpacing={1} columnSpacing={{ xs: 1 }} sx={{ mt: 1, display: 'flex', alignItems: 'center' }}>
                      <Grid item xs={12} lg={2} />
                      <Grid item xs={12} lg={4}>
                        <Typography>Address</Typography>
                      </Grid>
                      <Grid item xs={12} lg={6}>
                        <StyledTextField disabled={selectedTraffic !== 'VPN'}
                          sx={{ width: '100%' }}
                          size="small"
                          label="Address"
                          defaultValue="0.0.0.0:3000"
                          variant="outlined"
                        />
                      </Grid>
                    </Grid>
                  </Box>
                  <Box>
                    <Grid container rowSpacing={1} columnSpacing={{ xs: 1 }} sx={{ mt: 2, display: 'flex', alignItems: 'center' }}>
                      <Grid item xs={12} lg={2} />
                      <Grid item xs={12} lg={4}>
                        <Typography>Credentials</Typography>
                      </Grid>
                      <Grid item xs={12} lg={6}>
                        <StyledTextField disabled={selectedTraffic !== 'VPN'}
                          sx={{ width: '100%' }}
                          size="small"
                          label="Username"
                          variant="outlined"
                        />
                      </Grid>
                      <Grid item xs={12} lg={2} />
                      <Grid item xs={12} lg={4} />
                      <Grid item xs={12} lg={6}>
                        <StyledTextField disabled={selectedTraffic !== 'VPN'}
                          sx={{ width: '100%' }}
                          size="small"
                          label="Password"
                          variant="outlined"
                        />
                      </Grid>
                    </Grid>
                  </Box>
                </BoxInsideRadio>
              </RadioGroup>
            </Grid>
          </Grid>
        </Box>
        <Box sx={!isFallbackActive() ? {
          '& .MuiTypography-root': { color: alpha('#000000', 0.38) },
        } : {}}>
          <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
            <Grid item xs={12} sx={{ mt: 2 }}>
              <HeaderText>Fallback scenario</HeaderText>
            </Grid>
            <Grid item xs={12}>
              <Typography>If VPN tunnel / your 3GPP core is down, data plane goes</Typography>
            </Grid>
            <Grid item xs={12} lg={2} />
            <Grid item xs={12} lg={7}>
              <RadioGroup
                name="fallback-operator-radio-buttons-group"
                value={selectedFallback}
                onChange={handleFallbackChange}
              >
                <FormControlLabel disabled={!isFallbackActive()} value="nothing" control={
                  <Radio style={isFallbackActive() ? { color: 'black' } : {}} />
                } label={
                  <Typography sx={{ fontWeight: 'bold' }}>to null (do nothing)</Typography>
                } />
                <FormControlLabel disabled={!isFallbackActive()} value="public" control={
                  <Radio style={isFallbackActive() ? { color: 'black' } : {}} />
                } label={
                  <Typography sx={{ fontWeight: 'bold' }}>to public</Typography>
                } />
                <FormControlLabel disabled={!isFallbackActive()} value="VPN" control={
                  <Radio style={isFallbackActive() ? { color: 'black' } : {}} />
                } label={
                  <Typography sx={{ fontWeight: 'bold' }}>to my backup core (VPN)</Typography>
                } />
                <BoxInsideRadio sx={selectedTraffic !== 'VPN' ? { '& .MuiTypography-root': { color: alpha('#000000', 0.38) } } : {}}>
                  <Box>
                    <Grid container rowSpacing={1} columnSpacing={{ xs: 1 }} sx={{ mt: 1, display: 'flex', alignItems: 'center' }}>
                      <Grid item xs={12} lg={2} />
                      <Grid item xs={12} lg={4}>
                        <Typography>Address</Typography>
                      </Grid>
                      <Grid item xs={12} lg={6}>
                        <StyledTextField disabled={selectedTraffic !== 'VPN'}
                          sx={{ width: '100%' }}
                          size="small"
                          label="Address"
                          defaultValue="0.0.0.0:3000"
                          variant="outlined"
                        />
                      </Grid>
                    </Grid>
                  </Box>
                  <Box>
                    <Grid container rowSpacing={1} columnSpacing={{ xs: 1 }} sx={{ mt: 2, display: 'flex', alignItems: 'center' }}>
                      <Grid item xs={12} lg={2} />
                      <Grid item xs={12} lg={4}>
                        <Typography>Credentials</Typography>
                      </Grid>
                      <Grid item xs={12} lg={6}>
                        <StyledTextField disabled={selectedTraffic !== 'VPN'}
                          sx={{ width: '100%' }}
                          size="small"
                          label="Username"
                          variant="outlined"
                        />
                      </Grid>
                      <Grid item xs={12} lg={2} />
                      <Grid item xs={12} lg={4} />
                      <Grid item xs={12} lg={6}>
                        <StyledTextField disabled={selectedTraffic !== 'VPN'}
                          sx={{ width: '100%' }}
                          size="small"
                          label="Password"
                          variant="outlined"
                        />
                      </Grid>
                    </Grid>
                  </Box>
                </BoxInsideRadio>
              </RadioGroup>
            </Grid>
          </Grid>
        </Box>
        <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
          <ButtonsAtBottom />
        </Grid>
      </Box >
    )
  }

  function ConfigurationTab() {
    const [selectedImsi, setSelectedImsi] = React.useState('operator')

    const handleImsiChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      setSelectedImsi((event.target as HTMLInputElement).value);
    };

    return (
      <Box
        component="form"
        sx={{ width: '100%', }}
        noValidate
        autoComplete="off"
      >
        <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
          <Grid item xs={12}>
            <HeaderText>Configuration</HeaderText>
          </Grid>
          <Grid item xs={12}>
            <Typography>Final setup</Typography>
          </Grid>
          <Grid item xs={12} sx={{ mt: 4 }} />
          <Grid item xs={12}>
            <HeaderText>Select the IMSI list</HeaderText>
          </Grid>
          <Grid item xs={12} lg={2} />
          <Grid item xs={12} lg={7}>
            <RadioGroup
              name="fallback-operator-radio-buttons-group"
              value={selectedImsi}
              onChange={handleImsiChange}
            >
              <FormControlLabel value="operator" control={
                <Radio style={{ color: 'black' }} />
              } label={
                <Typography sx={{ fontWeight: 'bold' }}>Upload from telecom account</Typography>
              } />
              <BoxInsideRadio>
                <Typography>Link an account in the operator's personal account to link all registered IMSI.</Typography>
                <Box sx={selectedImsi !== 'operator' ? { '& .MuiTypography-root': { color: alpha('#000000', 0.38) } } : {}}>
                  <Grid container rowSpacing={1} columnSpacing={{ xs: 1 }} sx={{ mt: 1, display: 'flex', alignItems: 'center' }}>
                    <Grid item xs={12} lg={2} />
                    <Grid item xs={12} lg={10}>
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <StyledButton variant='outlined' disabled={selectedImsi !== 'operator'}>Connect</StyledButton>
                        <Typography sx={{ ml: 3 }}>Now connected to: "account"</Typography>
                      </Box>
                    </Grid>
                  </Grid>
                </Box>
              </BoxInsideRadio>
              <FormControlLabel value="manual" control={
                <Radio style={{ color: 'black' }} />
              } label={
                <Typography sx={{ fontWeight: 'bold' }}>Enter manually</Typography>
              } />
              <BoxInsideRadio>
                <Box sx={selectedImsi !== 'manual' ? { '& .MuiTypography-root': { color: alpha('#000000', 0.38) } } : {}}>
                  <Grid container rowSpacing={1} columnSpacing={{ xs: 1 }} sx={{ mt: 1, display: 'flex', alignItems: 'center' }}>
                    <Grid item xs={12} lg={2} />
                    <Grid item xs={12} lg={10}>
                      <StyledTextField disabled={selectedImsi !== 'manual'}
                        sx={{ width: '100%' }}
                        id="outlined-textarea"
                        label="IMSI list"
                        defaultValue={`3650511
7161003`}
                        multiline
                      />
                    </Grid>
                  </Grid>
                </Box>
              </BoxInsideRadio>
              <FormControlLabel value="CSV" control={
                <Radio style={{ color: 'black' }} />
              } label={
                <Typography sx={{ fontWeight: 'bold' }}>Upload a CVS file</Typography>
              } />
              <BoxInsideRadio>
                <Box sx={selectedImsi !== 'CSV' ? { '& .MuiTypography-root': { color: alpha('#000000', 0.38) } } : {}}>
                  <Grid container rowSpacing={1} columnSpacing={{ xs: 1 }} sx={{ mt: 1, display: 'flex', alignItems: 'center' }}>
                    <Grid item xs={12} lg={2} />
                    <Grid item xs={12} lg={10}>
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <StyledButton variant="outlined" disabled={selectedImsi !== 'CSV'} component="label">
                          Upload
                          <input hidden accept=".csv" multiple type="file" />
                        </StyledButton>
                        <Typography sx={{ ml: 3 }}>Uploaded file: jfkewoijer.csv</Typography>
                      </Box>
                    </Grid>
                  </Grid>
                </Box>
              </BoxInsideRadio>
            </RadioGroup>
          </Grid>
        </Grid>
        <Box sx={selectedRadio === 'nothing' ? { '& .MuiTypography-root': { color: alpha('#000000', 0.38) } } : {}}>
          <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
            <Grid item xs={12}>
              <HeaderText>Radio slice configuration</HeaderText>
            </Grid>
            <Grid item xs={12} lg={2} />
            <Grid item xs={12} lg={7}>
              <Typography sx={{ mt: 2 }}>Send a command to the devices about switching to slice radio.</Typography>
              <BoxInsideRadio></BoxInsideRadio>
            </Grid>
          </Grid>
        </Box>
        <Box sx={!isCoreWithVpnActive() ? { '& .MuiTypography-root': { color: alpha('#000000', 0.38) } } : {}}>
          <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
            <Grid item xs={12} sx={{ mt: 6 }}>
              <HeaderText>Core slice with VPN configuration</HeaderText>
            </Grid>
            <Grid item xs={12} lg={2} />
            <Grid item xs={12} lg={7}>
              <Box sx={{ mt: 2 }}>
                <Grid container rowSpacing={2} columnSpacing={{ xs: 1 }} sx={{ display: 'flex', alignItems: 'center' }}>
                  <Grid item xs={12} lg={4}>
                    <Typography>Specify the IP address of the VPN endpoint</Typography>
                  </Grid>
                  <Grid item xs={12} lg={8}>
                    <StyledTextField disabled={!isCoreWithVpnActive()}
                      sx={{ width: '100%' }}
                      size="small"
                      label="IP address"
                      defaultValue="0.0.0.0"
                      variant="outlined"
                    />
                  </Grid>
                  <Grid item xs={12} lg={4}>
                    <Typography>Specify the VPN public key</Typography>
                  </Grid>
                  <Grid item xs={12} lg={8}>
                    <StyledTextField disabled={!isCoreWithVpnActive()}
                      sx={{ width: '100%' }}
                      size="small"
                      label="VPN public key"
                      defaultValue=""
                      variant="outlined"
                    />
                  </Grid>
                </Grid>
                <Box sx={selectedFallback === 'nothing' ? { '& .MuiTypography-root': { color: alpha('#000000', 0.38) } } : {}}>
                  <Grid container rowSpacing={2} columnSpacing={{ xs: 1 }} sx={{ mt: '2px', display: 'flex', alignItems: 'center' }}>
                    <Grid item xs={12} lg={2} />
                    <Grid item xs={12} lg={4}>
                      <Typography>Specify the IP address of the backup VPN endpoint</Typography>
                    </Grid>
                    <Grid item xs={12} lg={6}>
                      <StyledTextField disabled={selectedFallback === 'nothing'}
                        sx={{ width: '100%' }}
                        size="small"
                        label="IP address"
                        defaultValue="0.0.0.0"
                        variant="outlined"
                      />
                    </Grid>
                    <Grid item xs={12} lg={2} />
                    <Grid item xs={12} lg={4}>
                      <Typography>Specify the public key of the backup VPN</Typography>
                    </Grid>
                    <Grid item xs={12} lg={6}>
                      <StyledTextField disabled={selectedFallback === 'nothing'}
                        sx={{ width: '100%' }}
                        size="small"
                        label="VPN public key"
                        defaultValue=""
                        variant="outlined"
                      />
                    </Grid>
                  </Grid>
                </Box>
                <Grid container rowSpacing={2} columnSpacing={{ xs: 1 }} sx={{ mt: '2px', display: 'flex', alignItems: 'center' }}>
                  <Grid item xs={12} lg={4}>
                    <Typography>IP address of the subscriber devices subnet</Typography>
                  </Grid>
                  <Grid item xs={12} lg={8}>
                    <StyledTextField disabled={!isCoreWithVpnActive()}
                      sx={{ width: '100%' }}
                      size="small"
                      label="IP address"
                      defaultValue="0.0.0.0"
                      variant="outlined"
                    />
                  </Grid>
                </Grid>
                <Box sx={{ mt: 2 }}>
                  <Grid container rowSpacing={2} columnSpacing={{ xs: 1 }} sx={{ mt: '2px', display: 'flex', alignItems: 'center' }}>
                    <Grid item xs={12}>
                      <Typography sx={{ fontWeight: 'bold' }}>For copying:</Typography>
                    </Grid>
                    <Grid item xs={12} lg={2} />
                    <Grid item xs={12} lg={4}>
                      <Typography>IP address of the operator's VPN endpoint</Typography>
                    </Grid>
                    <Grid item xs={12} lg={6}>
                      <StyledTextField disabled={!isCoreWithVpnActive()}
                        sx={{ width: '100%' }}
                        InputProps={{ readOnly: true, }}
                        size="small"
                        label="IP address"
                        defaultValue="0.0.0.0"
                        variant="outlined"
                      />
                    </Grid>
                    <Grid item xs={12} lg={2} />
                    <Grid item xs={12} lg={4}>
                      <Typography>Public key of the operator's VPN endpoint</Typography>
                    </Grid>
                    <Grid item xs={12} lg={6}>
                      <StyledTextField disabled={!isCoreWithVpnActive()}
                        sx={{ width: '100%' }}
                        InputProps={{ readOnly: true, }}
                        size="small"
                        label="Public key"
                        defaultValue="some public key"
                        variant="outlined"
                      />
                    </Grid>
                    <Grid item xs={12} lg={2} />
                    <Grid item xs={12} lg={4}>
                      <Typography>IP address of the gateway on the <Box sx={{ textDecoration: 'underline' }} display="inline">subscriber's</Box> side</Typography>
                    </Grid>
                    <Grid item xs={12} lg={6}>
                      <StyledTextField disabled={!isCoreWithVpnActive()}
                        sx={{ width: '100%' }}
                        InputProps={{ readOnly: true, }}
                        size="small"
                        label="IP address"
                        defaultValue="0.0.0.0"
                        variant="outlined"
                      />
                    </Grid>
                    <Grid item xs={12} lg={2} />
                    <Grid item xs={12} lg={4}>
                      <Typography>IP address of the gateway on the <Box sx={{ textDecoration: 'underline' }} display="inline">operator's</Box> side</Typography>
                    </Grid>
                    <Grid item xs={12} lg={6}>
                      <StyledTextField disabled={!isCoreWithVpnActive()}
                        sx={{ width: '100%' }}
                        InputProps={{ readOnly: true, }}
                        size="small"
                        label="IP address"
                        defaultValue="0.0.0.0"
                        variant="outlined"
                      />
                    </Grid>
                  </Grid>
                  <Box sx={{ mt: 3 }}>
                    <Grid container rowSpacing={2} columnSpacing={{ xs: 1 }} sx={{ mt: '2px', display: 'flex', alignItems: 'center' }}>
                      <Grid item xs={12} lg={4}>
                        <Typography>The location of the outer core</Typography>
                      </Grid>
                      <Grid item xs={12} lg={8}>
                        <StyledTextField disabled={!isCoreWithVpnActive()}
                          sx={{ width: '100%' }}
                          size="small"
                          select
                          label="Select"
                          defaultValue="1"
                        >
                          <MenuItem key='nearest' value='nearest'>Nearest</MenuItem>
                          <MenuItem key='1' value='1'>221B Baker Street, London</MenuItem>
                        </StyledTextField>
                      </Grid>
                    </Grid>
                  </Box>
                </Box>
              </Box>
            </Grid>
          </Grid>
          <BoxInsideRadio />
        </Box>
        <Box sx={!isTransferCoreActive() ? { '& .MuiTypography-root': { color: alpha('#000000', 0.38) } } : {}}>
          <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
            <Grid item xs={12} sx={{ mt: 2 }}>
              <HeaderText>Transferred core slice configuration</HeaderText>
            </Grid>
            <Grid item xs={12} lg={2} />
            <Grid item xs={12} lg={7}>
              <Box sx={{ mt: 2 }}>
                <Grid container rowSpacing={2} columnSpacing={{ xs: 1 }} sx={{ display: 'flex', alignItems: 'center' }}>
                  <Grid item xs={12} lg={4}>
                    <Typography>Specify the public IP address of the VPN endpoint</Typography>
                  </Grid>
                  <Grid item xs={12} lg={8}>
                    <StyledTextField disabled={!isTransferCoreActive()}
                      sx={{ width: '100%' }}
                      size="small"
                      label="IP address"
                      defaultValue="0.0.0.0"
                      variant="outlined"
                    />
                  </Grid>
                  <Grid item xs={12} lg={4}>
                    <Typography>Specify the VPN public key</Typography>
                  </Grid>
                  <Grid item xs={12} lg={8}>
                    <StyledTextField disabled={!isTransferCoreActive()}
                      sx={{ width: '100%' }}
                      size="small"
                      label="VPN public key"
                      defaultValue=""
                      variant="outlined"
                    />
                  </Grid>
                </Grid>
                <Box sx={selectedFallback === 'nothing' ? { '& .MuiTypography-root': { color: alpha('#000000', 0.38) } } : {}}>
                  <Grid container rowSpacing={2} columnSpacing={{ xs: 1 }} sx={{ mt: '2px', display: 'flex', alignItems: 'center' }}>
                    <Grid item xs={12} lg={2} />
                    <Grid item xs={12} lg={4}>
                      <Typography>Specify the public IP address of the backup VPN endpoint</Typography>
                    </Grid>
                    <Grid item xs={12} lg={6}>
                      <StyledTextField disabled={selectedFallback === 'nothing'}
                        sx={{ width: '100%' }}
                        size="small"
                        label="IP address"
                        defaultValue="0.0.0.0"
                        variant="outlined"
                      />
                    </Grid>
                    <Grid item xs={12} lg={2} />
                    <Grid item xs={12} lg={4}>
                      <Typography>Specify the public key of the backup VPN</Typography>
                    </Grid>
                    <Grid item xs={12} lg={6}>
                      <StyledTextField disabled={selectedFallback === 'nothing'}
                        sx={{ width: '100%' }}
                        size="small"
                        label="VPN public key"
                        defaultValue=""
                        variant="outlined"
                      />
                    </Grid>
                  </Grid>
                </Box>
                <Grid container rowSpacing={2} columnSpacing={{ xs: 1 }} sx={{ mt: '2px', display: 'flex', alignItems: 'center' }}>
                  <Grid item xs={12} lg={4}>
                    <Typography>Private IP subnet (subnets) VNF on the subscriber side</Typography>
                  </Grid>
                  <Grid item xs={12} lg={8}>
                    <StyledTextField disabled={!isTransferCoreActive()}
                      sx={{ width: '100%' }}
                      size="small"
                      label="IP address"
                      defaultValue="0.0.0.0"
                      variant="outlined"
                    />
                  </Grid>
                </Grid>
                <Box sx={{ mt: 2 }}>
                  <Grid container rowSpacing={2} columnSpacing={{ xs: 1 }} sx={{ mt: '2px', display: 'flex', alignItems: 'center' }}>
                    <Grid item xs={12}>
                      <Typography sx={{ fontWeight: 'bold' }}>For copying:</Typography>
                    </Grid>
                    <Grid item xs={12} lg={2} />
                    <Grid item xs={12} lg={5}>
                      <Typography>Private IP address of the operator's VPN endpoint - 5G Core</Typography>
                    </Grid>
                    <Grid item xs={12} lg={5}>
                      <StyledTextField disabled={!isTransferCoreActive()}
                        sx={{ width: '100%' }}
                        InputProps={{ readOnly: true, }}
                        size="small"
                        label="IP address"
                        defaultValue="0.0.0.0"
                        variant="outlined"
                      />
                    </Grid>
                    <Grid item xs={12} lg={2} />
                    <Grid item xs={12} lg={5}>
                      <Typography>Public key of the operator's VPN endpoint - 5G Core</Typography>
                    </Grid>
                    <Grid item xs={12} lg={5}>
                      <StyledTextField disabled={!isTransferCoreActive()}
                        sx={{ width: '100%' }}
                        InputProps={{ readOnly: true, }}
                        size="small"
                        label="Public key"
                        defaultValue="some public key"
                        variant="outlined"
                      />
                    </Grid>
                    <Grid item xs={12} lg={2} />
                    <Grid item xs={12} lg={5}>
                      <Typography>Private IP address of the gateway on the <Box sx={{ textDecoration: 'underline' }} display="inline">subscriber's</Box> side</Typography>
                    </Grid>
                    <Grid item xs={12} lg={5}>
                      <StyledTextField disabled={!isTransferCoreActive()}
                        sx={{ width: '100%' }}
                        InputProps={{ readOnly: true, }}
                        size="small"
                        label="IP address"
                        defaultValue="0.0.0.0"
                        variant="outlined"
                      />
                    </Grid>
                    <Grid item xs={12} lg={2} />
                    <Grid item xs={12} lg={5}>
                      <Typography>Private IP address of the gateway on the <Box sx={{ textDecoration: 'underline' }} display="inline">operator's</Box> side</Typography>
                    </Grid>
                    <Grid item xs={12} lg={5}>
                      <StyledTextField disabled={!isTransferCoreActive()}
                        sx={{ width: '100%' }}
                        InputProps={{ readOnly: true, }}
                        size="small"
                        label="IP address"
                        defaultValue="0.0.0.0"
                        variant="outlined"
                      />
                    </Grid>
                    <Grid item xs={12} sx={{ mt: 2 }}>
                      <Typography>NVF 5G core private IP addresses:</Typography>
                      <Typography>IP addresses of network functions:</Typography>
                    </Grid>
                    <Grid item xs={12} lg={2} />
                    <Grid item xs={12} lg={4}>
                      <Typography>Network function 1</Typography>
                    </Grid>
                    <Grid item xs={12} lg={6}>
                      <StyledTextField disabled={!isTransferCoreActive()}
                        sx={{ width: '100%' }}
                        InputProps={{ readOnly: true, }}
                        size="small"
                        label="IP address"
                        defaultValue="0.0.0.0"
                        variant="outlined"
                      />
                    </Grid>
                    <Grid item xs={12} lg={2} />
                    <Grid item xs={12} lg={4}>
                      <Typography>Network function 2</Typography>
                    </Grid>
                    <Grid item xs={12} lg={6}>
                      <StyledTextField disabled={!isTransferCoreActive()}
                        sx={{ width: '100%' }}
                        InputProps={{ readOnly: true, }}
                        size="small"
                        label="IP address"
                        defaultValue="0.0.0.0"
                        variant="outlined"
                      />
                    </Grid>
                    <Grid item xs={12} lg={2} />
                    <Grid item xs={12} lg={4}>
                      <Typography>Network function 3</Typography>
                    </Grid>
                    <Grid item xs={12} lg={6}>
                      <StyledTextField disabled={!isTransferCoreActive()}
                        sx={{ width: '100%' }}
                        InputProps={{ readOnly: true, }}
                        size="small"
                        label="IP address"
                        defaultValue="0.0.0.0"
                        variant="outlined"
                      />
                    </Grid>
                    <Grid item xs={12} sx={{ mt: 2 }}>
                      <Typography>Public IP addresses (subnets) of the RAN, from which incoming traffic of devices via the N2 and N3 interface to the local 5G core on the subscriber side should be allowed:</Typography>
                    </Grid>
                    <Grid item xs={12} lg={2} />
                    <Grid item xs={12} lg={4}>
                      <Typography>N2</Typography>
                    </Grid>
                    <Grid item xs={12} lg={6}>
                      <StyledTextField disabled={!isTransferCoreActive()}
                        sx={{ width: '100%' }}
                        InputProps={{ readOnly: true, }}
                        size="small"
                        label="IP address"
                        defaultValue="0.0.0.0"
                        variant="outlined"
                      />
                    </Grid>
                    <Grid item xs={12} lg={2} />
                    <Grid item xs={12} lg={4}>
                      <Typography>N3</Typography>
                    </Grid>
                    <Grid item xs={12} lg={6}>
                      <StyledTextField disabled={!isTransferCoreActive()}
                        sx={{ width: '100%' }}
                        InputProps={{ readOnly: true, }}
                        size="small"
                        label="IP address"
                        defaultValue="0.0.0.0"
                        variant="outlined"
                      />
                    </Grid>
                  </Grid>
                  <Box sx={{ mt: 3 }}>
                    <Grid container rowSpacing={2} columnSpacing={{ xs: 1 }} sx={{ mt: '2px', display: 'flex', alignItems: 'center' }}>
                      <Grid item xs={12} lg={6}>
                        <Typography>Specify public IP addresses for connection from the RAN side via the N2 interface</Typography>
                      </Grid>
                      <Grid item xs={12} lg={6}>
                        <StyledTextField disabled={!isTransferCoreActive()}
                          sx={{ width: '100%' }}
                          size="small"
                          label="IP address"
                          defaultValue="0.0.0.0"
                          variant="outlined"
                        />
                      </Grid>
                      <Grid item xs={12} lg={6}>
                        <Typography>Specify public IP addresses for connection from the RAN side via the N3 interface</Typography>
                      </Grid>
                      <Grid item xs={12} lg={6}>
                        <StyledTextField disabled={!isTransferCoreActive()}
                          sx={{ width: '100%' }}
                          size="small"
                          label="IP address"
                          defaultValue="0.0.0.0"
                          variant="outlined"
                        />
                      </Grid>
                      <Grid item xs={12} sx={{ mt: 2 }}>
                        <Typography sx={{fontWeight: 'bold'}}>Fallback:</Typography>
                      </Grid>
                      <Grid item xs={12} lg={6}>
                        <Typography>Select a fallback scenario in case the kernel functions are disabled on the subscriber's side</Typography>
                      </Grid>
                      <Grid item xs={12} lg={6}>
                        <StyledTextField disabled={!isTransferCoreActive()}
                          sx={{ width: '100%' }}
                          size="small"
                          select
                          label="Select"
                          defaultValue="nothing"
                        >
                          <MenuItem key='nearest' value='nothing'>do nothing, terminate access for subscribers</MenuItem>
                          <MenuItem key='backup' value='backup'>redirect traffic to the main core of the operator and send it to the VPN tunnel to the IP address of the gateway on the subscriber's side</MenuItem>
                          <MenuItem key='public' value='public'>redirect traffic to the main core of the operator and send it to the public network (Internet)</MenuItem>
                        </StyledTextField>
                      </Grid>
                      <Grid item xs={12} lg={6}>
                        <Typography>The number of seconds before the fallback scenario is activated after a crash</Typography>
                      </Grid>
                      <Grid item xs={12} lg={6}>
                        <StyledTextField disabled={!isTransferCoreActive()}
                          sx={{ width: '100%' }}
                          size="small"
                          label="Seconds"
                          defaultValue="30"
                        >
                        </StyledTextField>
                      </Grid>
                      <Grid item xs={12} lg={6}>
                        <Typography>The number of seconds before returning to the main scenario after recovery</Typography>
                      </Grid>
                      <Grid item xs={12} lg={6}>
                        <StyledTextField disabled={!isTransferCoreActive()}
                          sx={{ width: '100%' }}
                          size="small"
                          label="Seconds"
                          defaultValue="30"
                        >
                          <MenuItem key='nearest' value='nothing'>do nothing, terminate access for subscribers</MenuItem>
                          <MenuItem key='backup' value='backup'>redirect traffic to the main core of the operator and send it to the VPN tunnel to the IP address of the gateway on the subscriber's side</MenuItem>
                          <MenuItem key='public' value='public'>redirect traffic to the main core of the operator and send it to the public network (Internet)</MenuItem>
                        </StyledTextField>
                      </Grid>
                    </Grid>
                  </Box>
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Box>
        <BoxInsideRadio />
        <ButtonsAtBottom />
      </Box>
    )
  }

  return (
    <Box
      sx={{ flexGrow: 1, bgcolor: 'background.paper', display: 'flex' }}
    >
      <Tabs
        orientation="vertical"
        indicatorColor=""
        // textColor='inherit'
        variant="scrollable"
        value={tabValue}
        onChange={handleTabChange}
        sx={{ borderRight: 0, borderColor: 'divider', display: 'flex', overflow: 'visible' }}
      >
        <StyledTab disabled sx={{}} label="Steps" />
        <StyledTab label="Radio slice" {...a11yProps(0)} />
        <StyledTab label="Core slice" {...a11yProps(1)} />
        <StyledTab label="Geography" {...a11yProps(2)} />
        <StyledTab label="Time and billing" {...a11yProps(3)} />
        <StyledTab label="Configuration" {...a11yProps(4)} />
        <StyledTab label="Summary" {...a11yProps(5)} />
      </Tabs>
      <Box sx={{ flexGrow: 1 }}>
        <TabPanel value={tabValue} index={0} />
        <TabPanel value={tabValue} index={1}>
          <RadioSliceTab />
        </TabPanel>
        <TabPanel value={tabValue} index={2}>
          <CoreSliceTab />
        </TabPanel>
        <TabPanel value={tabValue} index={3}>
          <Geography buttonsAtBottom={<ButtonsAtBottom />} />
        </TabPanel>
        <TabPanel value={tabValue} index={4}>
          Time and Billing
          <ButtonsAtBottom />
        </TabPanel>
        <TabPanel value={tabValue} index={5}>
          <ConfigurationTab />
        </TabPanel>
        <TabPanel value={tabValue} index={6}>
          Summary
          <ButtonsAtBottom />
        </TabPanel>
      </Box>
    </Box>
  );
}

