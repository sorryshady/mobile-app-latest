import {
  getCurrentUser,
  getLatestUserRequest,
  getCompleteUser,
} from "@/api/user";
import { User, RequestResponse, CompleteUser } from "@/constants/types";

import {
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
  useEffect,
  useState,
  useCallback,
} from "react";

interface GlobalContextType {
  isLoggedIn: boolean;
  setIsLoggedIn: Dispatch<SetStateAction<boolean>>;
  user: User | null;
  setUser: Dispatch<SetStateAction<User | null>>;
  completeUserData: CompleteUser | null;
  setCompleteUserData: Dispatch<SetStateAction<CompleteUser | null>>;
  isLoading: boolean;
  latestRequest: RequestResponse | null;
  setLatestRequest: Dispatch<SetStateAction<RequestResponse | null>>;
  refetchData: () => Promise<void>;
}

const GlobalContext = createContext<GlobalContextType>({
  isLoggedIn: false,
  setIsLoggedIn: () => {},
  user: null,
  setUser: () => {},
  completeUserData: null,
  setCompleteUserData: () => {},
  isLoading: true,
  latestRequest: null,
  setLatestRequest: () => {},
  refetchData: async () => {},
});

export const useGlobalContext = () => useContext(GlobalContext);

const GlobalProvider = ({ children }: { children: React.ReactNode }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [completeUserData, setCompleteUserData] = useState<CompleteUser | null>(
    null,
  );
  const [isLoading, setIsLoading] = useState(true);
  const [latestRequest, setLatestRequest] = useState<RequestResponse | null>(
    null,
  );

  const fetchUserData = useCallback(async () => {
    try {
      const userResponse = await getCurrentUser();
      if (userResponse) {
        setIsLoggedIn(true);
        setUser(userResponse);

        // Fetch complete user data
        try {
          const completeUser = await getCompleteUser();
          setCompleteUserData(completeUser);
        } catch (error) {
          console.log("Error fetching complete user data:", error);
        }

        // Fetch latest request
        try {
          const requestResponse = await getLatestUserRequest(
            userResponse.membershipId!,
          );
          setLatestRequest(requestResponse);
        } catch (error) {
          console.log("Error fetching latest request:", error);
          setLatestRequest(null);
        }
      } else {
        setIsLoggedIn(false);
        setUser(null);
        setCompleteUserData(null);
        setLatestRequest(null);
      }
    } catch (error) {
      console.log("Error fetching user:", error);
      setIsLoggedIn(false);
      setUser(null);
      setCompleteUserData(null);
      setLatestRequest(null);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchUserData();
  }, [fetchUserData]);

  return (
    <GlobalContext.Provider
      value={{
        isLoggedIn,
        setIsLoggedIn,
        user,
        setUser,
        completeUserData,
        setCompleteUserData,
        isLoading,
        latestRequest,
        setLatestRequest,
        refetchData: fetchUserData,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export default GlobalProvider;
