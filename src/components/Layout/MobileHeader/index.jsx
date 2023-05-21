import { Box, Divider, Drawer, List, ListItem, ListItemText, Toolbar, Typography } from "@mui/material";
import { useState } from "react";
import { Link } from "react-router-dom";

import CloseIcon from "../../../assets/icons/CloseIcon";
import MenuIcon from "../../../assets/icons/MenuIcon";

// function MobileNavbar() {
//   const [openDrawer, setOpenDrawer] = useState(false);
//   return (
//     <>
//       <Drawer anchor="top" sx={{ width: 250, color: "#fff" }} open={openDrawer} onClose={() => setOpenDrawer(false)}>
//         <Toolbar sx={{ backgroundColor: "primary.main" }}>
//           <Typography variant="h4">Navbar</Typography>
//           <CloseIcon />
//         </Toolbar>
//         <Box sx={{ backgroundColor: "primary.main" }} height="100vh">
//           <List height="100vh">
//             <Divider />
//             <ListItem onClick={() => setOpenDrawer(false)}>
//               <ListItemText>
//                 <Link to="/">首页</Link>
//               </ListItemText>
//             </ListItem>
//             <Divider />
//             <ListItem>
//               <ListItemText>
//                 <Link to="/" className={classes.link}>
//                   关于
//                 </Link>
//               </ListItemText>
//             </ListItem>
//             <Divider />
//             <ListItem>
//               <ListItemText>
//                 <Link to="/" className={classes.link}>
//                   联系
//                 </Link>
//               </ListItemText>
//             </ListItem>
//             <Divider />
//             <ListItem>
//               <ListItemText>
//                 <Link to="/">FAQ</Link>
//               </ListItemText>
//             </ListItem>
//             <Divider />
//           </List>
//         </Box>
//       </Drawer>
//       <IconButton onClick={() => setOpenDrawer(!openDrawer)}>
//         <MenuIcon />
//       </IconButton>
//     </>
//   );
// }

function MobileNavbar() {
  return <>HEI</>;
}

export default MobileNavbar;
