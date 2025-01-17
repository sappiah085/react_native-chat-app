import Svg, { Path } from "react-native-svg";

export const Icons = {
  Plus: ({ color = "#1A1A1A" }: { color?: string }) => (
    <Svg width="18" height="18" viewBox="0 0 18 18" fill="none">
      <Path
        d="M1 9.00006H17M9 1V17"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </Svg>
  ),
  Search: () => (
    <Svg fill="none" height="20" viewBox="0 0 20 20" width="20">
      <Path
        d="m13 12.899c1.2372-1.2626 2-2.99169 2-4.899 0-3.86599-3.134-7-7-7-3.86599 0-7 3.13401-7 7 0 3.866 3.13401 7 7 7 1.95869 0 3.7295-.8045 5-2.101zm0 0 6 6.101"
        stroke="#1a1a1a"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
      />
    </Svg>
  ),
  Back: () => (
    <Svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <Path
        d="M15 7.99998H1M1 7.99998L8 15M1 7.99998L8 1"
        stroke="#1A1A1A"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  ),
  Menu: () => (
    <Svg width="18" height="4" viewBox="0 0 18 4" fill="none">
      <Path
        d="M9.00003 3C9.55232 3 10 2.55228 10 2C10 1.44772 9.55232 1 9.00003 1C8.44775 1 8.00003 1.44772 8.00003 2C8.00003 2.55228 8.44775 3 9.00003 3Z"
        stroke="#1A1A1A"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M16 3C16.5523 3 17 2.55228 17 2C17 1.44772 16.5523 1 16 1C15.4477 1 15 1.44772 15 2C15 2.55228 15.4477 3 16 3Z"
        stroke="#1A1A1A"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M2 3C2.55228 3 3 2.55228 3 2C3 1.44772 2.55228 1 2 1C1.44772 1 1 1.44772 1 2C1 2.55228 1.44772 3 2 3Z"
        stroke="#1A1A1A"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  ),
  Like: () => (
    <Svg width="22" height="22" viewBox="0 0 22 22" fill="none">
      <Path
        d="M6 21H3C2.46957 21 1.96086 20.7893 1.58579 20.4142C1.21071 20.0391 1 19.5304 1 19V12C1 11.4696 1.21071 10.9609 1.58579 10.5858C1.96086 10.2107 2.46957 10 3 10H6M13 8V4C13 3.20435 12.6839 2.44129 12.1213 1.87868C11.5587 1.31607 10.7956 1 10 1L6 10V21H17.28C17.7623 21.0055 18.2304 20.8364 18.5979 20.524C18.9654 20.2116 19.2077 19.7769 19.28 19.3L20.66 10.3C20.7035 10.0134 20.6842 9.72068 20.6033 9.44225C20.5225 9.16382 20.3821 8.90629 20.1919 8.68751C20.0016 8.46873 19.7661 8.29393 19.5016 8.17522C19.2371 8.0565 18.9499 7.99672 18.66 8H13Z"
        stroke="#1A1A1A"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  ),
};
