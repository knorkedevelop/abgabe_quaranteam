import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { View, Image } from "react-native";
import {
  CreateAccountScreen,
  UserTypeScreen,
  LoginScreen,
  ForgotPasswordScreen,
  SignupWorkerScreen,
  SignupEmployerScreen,
  EmailVerificationScreen,
  ProfileWorkerScreen,
  ProfileEmployerScreen,
  EditProfileWorkerScreen,
  EditProfileEmployerScreen,
  HomeWorkerScreen,
  HomeEmployerScreen,
  MatchesScreen,
  MainScreen,
  MessagesScreen,
  OptionsScreen,
  ProfileMainEmployerScreen,
  JobsEmployerScreen,
  PickJobChatScreen,
  EditJobScreen,
} from "./src/Screens";
import baseStyles from "./styles/baseStyles";
import post from "./src/networking";

export const AuthContext = React.createContext();
export const UserContext = React.createContext();
export const JobContext = React.createContext();
export const RecommendationContext = React.createContext();

const Stack = createStackNavigator();

export default function App({ navigation }) {
  const [authState, authDispatch] = React.useReducer(
    (prevState, action) => {
      switch (action.type) {
        case "RESTORE_TOKEN":
          return {
            ...prevState,
            authToken: action.authToken,
            isLoading: false,
          };
        case "LOG_IN":
          return {
            ...prevState,
            isLoggingOut: false,
            authToken: action.authToken,
            userIsWorker: action.userIsWorker,
          };
        case "LOG_OUT":
          return {
            ...prevState,
            isLoggingOut: true,
            authToken: null,
          };
        case "REGISTER":
          return {
            ...prevState,
            authToken: action.authToken,
            userIsWorker: action.userIsWorker,
          };
      }
    },
    {
      isLoading: true,
      isLoggingOut: false,
      authToken: null,
      userIsWorker: true,
    }
  );

  const [userState, setUserState] = React.useState({
    image:
      "https://moonvillageassociation.org/wp-content/uploads/2018/06/default-profile-picture1.jpg",
    firstName: "",
    lastName: "",
    location: "",
    hashtags: "",
    day: 1,
    month: 1,
    year: 1980,
    companyName: "",
    description: "",
    logo: "",
    masterCertificate: "",
  });

  // React.useEffect(() => {
  //   const bootstrapAsync = async () => {
  //     let userToken;

  //     try {
  //       // Redux stuff, get token
  //     } catch (e) {
  //       // Restoring token failed
  //     }

  //     // After restoring token, we may need to validate it in production apps

  //     // This will switch to the App screen or Auth screen and this loading
  //     // screen will be unmounted and thrown away.
  //     dispatch({ type: 'RESTORE_TOKEN', token: userToken });
  //   };

  //   bootstrapAsync();
  // }, []);

  const authContext = React.useMemo(
    () => ({
      logIn: async (data) => {
        const response = await post("api/auth/login", data);
        if (response.error) console.log(response);
        else {
          authDispatch({
            type: "LOG_IN",
            authToken: response.auth_token,
            userIsWorker: response.isWorker,
          });
        }
      },
      logOut: () => authDispatch({ type: "LOG_OUT" }),
      register: async (data) => {
        const response = await post("api/auth/register", data);
        if (response.error) console.log(response);
        else
          authDispatch({
            type: "REGISTER",
            authToken: response.auth_token,
            userIsWorker: data.user_type === "worker",
          });
      },
    }),
    []
  );

  const userContext = React.useMemo(() => {
    const getData = function () {
      if (authState.authToken !== null) {
        post("api/profile/get_profile", {}, authState.authToken)
          .then((json) => {
            if (json.error_code) console.log(json.error_code);

            setUserState({
              image: json.image,
              firstName: json.first_name,
              lastName: json.last_name,
              location: json.location,
              hashtags: json.hashtags,
              day: json.birth_day,
              month: json.birth_month,
              year: json.birth_year,
              companyName: json.company_name,
              description: json.description,
              logo: json.logo,
              masterCertificate: json.master_certificate,
            });
          })
          .catch((e) => console.log(e));
      }
    };

    getData();

    return {
      setData: async (data) => {
        const response = await post(
          "api/profile/update_profile",
          data,
          authState.authToken
        );
        if (response.error) console.log(response);

        getData();
      },
    };
  }, [authState]);

  const [jobState, dispatchJob] = React.useReducer(
    (prevState, action) => {
      switch (action.type) {
        case "CREATE_JOB":
          return {
            jobs: prevState.jobs.concat([
              {
                id: action.jobId,
                title: action.title,
                type: action.jobType,
                description: action.description,
                location: action.location,
                mustHave: action.mustHave,
                niceHave: action.niceHave,
                hashtags: action.hashtags,
                isActive: true,
              },
            ]),
          };
        case "UPDATE_JOB":
          return {
            jobs: prevState.jobs.map((job) =>
              job.id === action.jobId
                ? {
                    id: job.id,
                    title: action.title,
                    type: action.job_type,
                    description: action.description,
                    location: action.location,
                    mustHave: action.must_have,
                    niceHave: action.nice_have,
                    isActive: action.is_active,
                    hashtags: action.hashtags,
                  }
                : job
            ),
          };
        case "REMOVE_JOB":
          return {
            jobs: prevState.jobs.filter((job) => job.id !== action.jobId),
          };
        case "TOGGLE_ACTIVATE":
          return {
            jobs: prevState.jobs.map((job) =>
              job.id === action.jobId
                ? {
                    ...job,
                    isActive: !job.isActive,
                  }
                : job
            ),
          };
        case "SET_JOBS":
          return { jobs: action.jobs };
      }
    },
    {
      jobs: [],
    }
  );

  const jobContext = React.useMemo(() => {
    const getAllJobs = function () {
      if (authState.authToken !== null) {
        post("api/profile/get_jobs", {}, authState.authToken)
          .then((json) => {
            if (json.error_code) console.log(json.error_code);
            else
              dispatchJob({
                type: "SET_JOBS",
                jobs: json.jobs.map((job) => ({
                  id: job.job_id,
                  title: job.title,
                  type: job.job_type,
                  description: job.description,
                  location: job.location,
                  mustHave: job.must_have,
                  niceHave: job.nice_have,
                  isActive: job.is_active,
                  hashtags: job.hashtags,
                })),
              });
          })
          .catch((e) => console.log(e));
      }
    };

    if (authState.userIsWorker === false) getAllJobs();

    return {
      createJob: async (data) => {
        const json = await post(
          "api/profile/create_job",
          { ...data },
          authState.authToken
        );

        if (json.error_code) console.log(json.error_code);
        else
          dispatchJob({
            type: "CREATE_JOB",
            title: data.title,
            jobType: data.type,
            description: data.description,
            location: data.location,
            mustHave: data.must_have,
            niceHave: data.nice_have,
            hashtags: data.hashtags,
            jobId: json.job_id,
            isActive: json.is_active,
          });
      },
      updateJob: async (jobId, data) => {
        const json = await post(
          "api/profile/update_job",
          {
            job_id: jobId,
            ...data,
            type: data.job_type,
            hashtags: data.hashtags,
          },
          authState.authToken
        );
        if (json.error_code) console.log(json.error_code);
        else dispatchJob({ jobId, ...data, type: "UPDATE_JOB" });
      },
      toggleActivateJob: async (jobId) => {
        const json = await post(
          "api/profile/toggle_activate_job",
          { job_id: jobId },
          authState.authToken
        );
        if (json.error_code) console.log(json.error_code);
        else dispatchJob({ jobId, type: "TOGGLE_ACTIVATE" });
      },
      removeJob: async (jobId) => {
        const json = await post(
          "api/profile/delete_job",
          { job_id: jobId },
          authState.authToken
        );
        if (json.error_code) console.log(json.error_code);
        else dispatchJob({ type: "REMOVE_JOB", jobId });
      },
    };
  }, [authState]);

  const [recommendationState, dispatchRecommendation] = React.useReducer(
    (prevState, action) => {
      switch (action.type) {
        case "SET_RECOMMENDATIONS":
          return {
            recommendations: action.recommendations,
          };
        case "LIKE":
          if ("job" in prevState.recommendations[0]) return prevState;
          return {
            recommendations: prevState.recommendations.map((rec) =>
              rec.id === action.id ? { ...rec, accepted: true } : rec
            ),
          };
        case "DISLIKE":
          if ("job" in prevState.recommendations[0]) return prevState;
          return {
            recommendations: prevState.recommendations.map((rec) =>
              rec.id === action.id ? { ...rec, accepted: false } : rec
            ),
          };
      }
    },
    {
      recommendations: [],
    }
  );

  const [notificationCheat, dispatchNotificationCheat] = React.useReducer(
    (prevState, action) => {
      switch (action.type) {
        case "INCREMENT":
          return {
            number: prevState.number + 1,
          };
      }
    },
    { number: 0 }
  );

  const recommendationContext = React.useMemo(() => {
    const getAllRecommendations = function () {
      if (authState.authToken === null) {
        dispatchRecommendation({
          type: "SET_RECOMMENDATIONS",
          recommendations: [],
        });
      } else {
        post("api/matching/get_user_recs", {}, authState.authToken)
          .then((json) => {
            if (json.error_code) console.log(json.error_code);
            else if (authState.userIsWorker)
              dispatchRecommendation({
                type: "SET_RECOMMENDATIONS",
                recommendations: json.jobs.map((job) => ({
                  id: job.job_id,
                  image: job.job_image,
                  title: job.title,
                  type: job.job_type,
                  description: job.description,
                  location: job.location,
                  mustHave: job.must_have,
                  niceHave: job.nice_have,
                  isActive: job.is_active,
                  hashtags: job.hashtags,
                  accepted: null,
                })),
              });
            else
              dispatchRecommendation({
                type: "SET_RECOMMENDATIONS",
                recommendations: json.jobs.map(({ job, worker: workers }) => ({
                  job: {
                    id: job.job_id,
                    title: job.title,
                    description: job.description,
                    isActive: job.is_active,
                    location: job.location,
                    mustHave: job.must_have,
                    niceHave: job.nice_have,
                    hashtags: job.hashtags,
                    type: job.type,
                  },
                  workers: workers.map((worker) => ({
                    id: worker.id,
                    image: worker.image,
                    firstName: worker.first_name,
                    lastName: worker.last_name,
                    location: worker.location,
                    hashtags: worker.hashtags,
                    day: worker.birth_day,
                    month: worker.birth_month,
                    year: worker.birth_year,
                    companyName: worker.company_name,
                    description: worker.description,
                    logo: worker.logo,
                    masterCertificate: worker.master_certificate,
                  })),
                })),
              });
          })
          .catch((e) => console.log(e));
      }
    };

    getAllRecommendations();

    return {
      likeRecommendation: async (recommendationId) => {
        dispatchNotificationCheat({ type: "INCREMENT" });
      },
      dislikeRecommendation: async (recommendationId) => {
        dispatchNotificationCheat({ type: "INCREMENT" });
      },
    };
  }, [authState, jobState]);

  return (
    <AuthContext.Provider value={{ ...authContext, authState: authState }}>
      <UserContext.Provider value={{ ...userContext, userState: userState }}>
        <JobContext.Provider value={{ ...jobContext, jobState }}>
          <RecommendationContext.Provider
            value={{
              ...recommendationContext,
              recommendationState,
              notificationCheat,
            }}
          >
            <View style={{ flex: 1, backgroundColor: "white" }}>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  backgroundColor: "#1b9195",
                  paddingTop: 30,
                }}
              ></View>
              <View
                style={{ alignItems: "center", marginTop: 7, marginRight: 5 }}
              >
                <Image
                  style={{ width: 120, height: 50 }}
                  source={require("./assets/cohooyo.png")}
                ></Image>
              </View>
              <NavigationContainer>
                <Stack.Navigator
                  screenOptions={{
                    headerShown: true,
                    headerTitle: false,
                    headerStyle: {
                      height: 15,
                      backgroundColor: "white",
                      borderBottomColor: "transparent",
                    },
                  }}
                >
                  {authState.authToken == null ? (
                    <>
                      <Stack.Screen
                        name="Login"
                        component={LoginScreen}
                        options={{ title: "Log in" }}
                      />
                      <Stack.Screen
                        name="CreateAccount"
                        component={CreateAccountScreen}
                        options={{ title: "Create Account" }}
                      />
                      <Stack.Screen
                        name="UserType"
                        component={UserTypeScreen}
                        options={{ title: "User Type" }}
                      />
                      <Stack.Screen
                        name="ForgotPassword"
                        component={ForgotPasswordScreen}
                        options={{ title: "Forgot Password" }}
                      />
                      <Stack.Screen
                        name="SignupWorker"
                        component={SignupWorkerScreen}
                        options={{ title: "Sign up" }}
                      />
                      <Stack.Screen
                        name="SignupEmployer"
                        component={SignupEmployerScreen}
                        options={{ title: "Sign up" }}
                      />
                      <Stack.Screen
                        name="EmailVerification"
                        component={EmailVerificationScreen}
                        options={{ title: "Email Verification" }}
                      />
                    </>
                  ) : authState.userIsWorker ? (
                    <>
                      <Stack.Screen
                        name="Main"
                        component={MainScreen}
                        options={{ title: "Home" }}
                      />
                      <Stack.Screen
                        name="Matches"
                        component={MatchesScreen}
                        options={{ title: "Matches" }}
                      />
                      <Stack.Screen
                        name="Messages"
                        component={MessagesScreen}
                        options={{ title: "Messages" }}
                      />
                      <Stack.Screen
                        name="Options"
                        component={OptionsScreen}
                        options={{ title: "Options" }}
                      />
                      <Stack.Screen
                        name="HomeWorker"
                        component={HomeWorkerScreen}
                        options={{ title: "Home" }}
                      />
                      <Stack.Screen
                        name="ProfileWorker"
                        component={ProfileWorkerScreen}
                        options={{ title: "Profile" }}
                      />
                      <Stack.Screen
                        name="EditProfileWorker"
                        component={EditProfileWorkerScreen}
                        options={{ title: "Edit Profile" }}
                      />
                    </>
                  ) : (
                    <>
                      <Stack.Screen
                        name="Main"
                        component={MainScreen}
                        options={{ title: "Home" }}
                      />
                      <Stack.Screen
                        name="Jobs"
                        component={PickJobChatScreen}
                        options={{ title: "Job Screen" }}
                      />
                      <Stack.Screen
                        name="EditJob"
                        component={EditJobScreen}
                        options={{ title: "Edit Job" }}
                      />
                      <Stack.Screen
                        name="Matches"
                        component={MatchesScreen}
                        options={{ title: "Matches" }}
                      />
                      <Stack.Screen
                        name="Messages"
                        component={MessagesScreen}
                        options={{ title: "Messages" }}
                      />
                      <Stack.Screen
                        name="Options"
                        component={OptionsScreen}
                        options={{ title: "Options" }}
                      />
                      <Stack.Screen
                        name="HomeEmployer"
                        component={HomeEmployerScreen}
                        options={{ title: "Home" }}
                      />
                      <Stack.Screen
                        name="ProfileEmployer"
                        component={ProfileEmployerScreen}
                        options={{ title: "Profile" }}
                      />
                      <Stack.Screen
                        name="EditProfileEmployer"
                        component={EditProfileEmployerScreen}
                        options={{ title: "Edit Profile" }}
                      />
                      <Stack.Screen
                        name="JobsEmployer"
                        component={JobsEmployerScreen}
                        options={{ title: "Job ads" }}
                      />
                      <Stack.Screen
                        name="ProfileMainEmployer"
                        component={ProfileMainEmployerScreen}
                        options={{ title: "Profil Arbeitgeber" }}
                      />
                    </>
                  )}
                </Stack.Navigator>
              </NavigationContainer>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  backgroundColor: "#1b9195",
                  paddingTop: 30,
                  overflow: "scroll",
                }}
              ></View>
            </View>
          </RecommendationContext.Provider>
        </JobContext.Provider>
      </UserContext.Provider>
    </AuthContext.Provider>
  );
}
