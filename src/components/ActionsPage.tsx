import { useEffect, useMemo, useState } from "react";
import { config } from "../API/ConfigAPI";
import {
  CallsApi,
  CampaignsApi,
  ListsApi,
  ListsResponse,
  SubscriberResponse,
  SubscribersApi,
} from "@dynopii/callchimp";
const ActionsPage = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  // const [campaignId, setCampaignId] = useState<number | undefined>();
  const [callType, setCallType] = useState<string | undefined>("");

  interface CreateSubs {
    last_name: string;
    first_name: string;
    leadlist: number;
    phone_code: string;
    phone_number: string;
  }

  const [subscriber, setSubscriber] = useState<CreateSubs>({
    last_name: "",
    first_name: "",
    leadlist: 0,
    phone_code: "",
    phone_number: "",
  });

  const SubscribersAPI = useMemo(() => new SubscribersApi(config), []);
  const ListsAPI = useMemo(() => new ListsApi(config), []);
  const CallAPI = useMemo(() => new CallsApi(config), []);
  const CampaignsAPI = useMemo(() => new CampaignsApi(config), []);

  const [subscriberListArray, setSubscriberListArray] = useState<
    SubscriberResponse[] | undefined
  >([]);

  const [Lists, setLists] = useState<ListsResponse[] | undefined>([]);

  useEffect(() => {
    const List = ListsAPI.listsList();
    List.then((res) => {
      setLists(res.results);
    }).catch((error) => {
      console.error(error);
    });
  }, [ListsAPI]);

  useEffect(() => {
    getSubscriberList();
  }, []);

  const getSubscriberList = () => {
    const SubscriberList = SubscribersAPI.subscribersList();
    setIsLoading(true);
    SubscriberList.then((res) => {
      setSubscriberListArray(res.results);
      setIsLoading(false);
    }).catch((error) => {
      console.error(error);
      setIsLoading(false);
    });
  };

  const CreateSubscriberHandle = (subscriberObj: CreateSubs) => {
    const createSubscriber = SubscribersAPI.subscribersPost({
      call: false,
      subscriberRequest: {
        firstName: subscriberObj.first_name,
        lastName: subscriberObj.last_name,
        leadlist: subscriberObj.leadlist,
        phoneCode: subscriberObj.phone_code,
        phoneNumber: subscriberObj.phone_number,
      },
    });
    createSubscriber.then((res) => {
      console.log(res);
      getSubscriberList();
    });
  };

  const DeleteSubscriberHandle = (id: number) => {
    const deleteSubscriber = SubscribersAPI.subscribersDelete({ id: id });
    deleteSubscriber.then(() => {
      console.log("subscriber deleted successfully");
      getSubscriberList();
    });
  };

  interface LeadList {
    [key: number]: string | undefined;
  }

  const LeadList: LeadList = {};

  Lists?.forEach((list) => {
    if (typeof list.id === "number") {
      LeadList[list.id] = list.name;
    }
  });

  const getListDetailsById = async (id: number, subsId: number) => {
    try {
      const listDetails = await ListsAPI.listsGet({ id: id });
      const tempCampaignId = listDetails.campaign;
      if (typeof tempCampaignId === "number") {
        const campaignDetails = await CampaignsAPI.campaignsGet({
          id: tempCampaignId,
        });
        const tempcalltype = campaignDetails.type;
        setCallType(tempcalltype);
        callHandler(subsId, tempcalltype, "");
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    console.log(callType);
  }, [callType]);

  const callHandler = async (
    value: number,
    calltype: string | undefined,
    vendorLeadCode: string
  ) => {
    try {
      if (calltype === "blastout") {
        const makeCall = await CallAPI.callsPost({
          callsPostRequest: {
            lead: value,
            transactionVars: {},
            vendorLeadCode: vendorLeadCode,
          },
        });
      } else if (calltype === "transactional") {
        const makeCall = await CallAPI.callsPost({
          callsPostRequest: {
            lead: value,
            transactionVars: {
              order_id: "456654",
            },
            vendorLeadCode: vendorLeadCode,
          },
        });
      } else {
        const makeCall = await CallAPI.callsPost({
          callsPostRequest: {
            lead: value,
            transactionVars: {},
            vendorLeadCode: vendorLeadCode,
          },
        });
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="container">
      <div className="bg-secondary m-4 rounded-1 d-flex justify-content-evenly align-items-center">
        <h1> Customer's List</h1>
        <button
          className="btn btn-dark text-light"
          data-bs-toggle="modal"
          data-bs-target="#createModal"
        >
          CREATE +
        </button>
        <div
          className="modal fade"
          id="createModal"
          tabIndex={-1}
          aria-labelledby="createModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h1 className="modal-title fs-5" id="createModalLabel">
                  Create Subscriber
                </h1>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <div className="modal-body">
                <div className="mb-3 row">
                  <label
                    htmlFor="inputPassword"
                    className="col-sm-2 col-form-label"
                  >
                    First Name
                  </label>
                  <div className="col-sm-10">
                    <input
                      type="text"
                      className="form-control"
                      id="inputPassword"
                      value={subscriber.first_name}
                      onChange={(e) => {
                        setSubscriber({
                          ...subscriber,
                          first_name: e.target.value,
                        });
                      }}
                    />
                  </div>
                </div>
                <div className="mb-3 row">
                  <label
                    htmlFor="inputPassword"
                    className="col-sm-2 col-form-label"
                  >
                    Last Name
                  </label>
                  <div className="col-sm-10">
                    <input
                      type="text"
                      className="form-control"
                      id="inputPassword"
                      value={subscriber.last_name}
                      onChange={(e) => {
                        setSubscriber({
                          ...subscriber,
                          last_name: e.target.value,
                        });
                      }}
                    />
                  </div>
                </div>
                <div className="mb-3 row">
                  <label
                    htmlFor="inputPassword"
                    className="col-sm-2 col-form-label"
                  >
                    Lead List
                  </label>
                  <div className="col-sm-10">
                    <select
                      className="form-select"
                      aria-label="Default select example"
                      value={subscriber.leadlist}
                      onChange={(
                        event: React.ChangeEvent<HTMLSelectElement>
                      ) => {
                        const value = parseInt(event.target.value, 10);
                        setSubscriber({
                          ...subscriber,
                          leadlist: value,
                        });
                      }}
                    >
                      <option selected>Select the lead list</option>
                      {Lists?.map((item) => (
                        <option value={item.id}>{item.name}</option>
                      ))}
                    </select>
                  </div>
                </div>
                <div className="mb-3 row">
                  <label
                    htmlFor="inputPassword"
                    className="col-sm-2 col-form-label"
                  >
                    Phone Code
                  </label>
                  <div className="col-sm-10">
                    <input
                      type="number"
                      className="form-control"
                      id="inputPassword"
                      value={subscriber.phone_code}
                      onChange={(event) => {
                        setSubscriber({
                          ...subscriber,
                          phone_code: event.target.value,
                        });
                      }}
                    />
                  </div>
                </div>
                <div className="mb-3 row">
                  <label
                    htmlFor="inputPassword"
                    className="col-sm-2 col-form-label"
                  >
                    Phone Number
                  </label>
                  <div className="col-sm-10">
                    <input
                      type="number"
                      className="form-control"
                      id="inputPassword"
                      value={subscriber.phone_number}
                      onChange={(event) => {
                        setSubscriber({
                          ...subscriber,
                          phone_number: event.target.value,
                        });
                      }}
                    />
                  </div>
                </div>
              </div>
              <div className="modal-footer" data-bs-dismiss="modal">
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={() => {
                    CreateSubscriberHandle(subscriber);
                  }}
                >
                  Create
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <table className="table table-striped">
        <thead>
          <tr>
            <th scope="col">ID #</th>
            <th scope="col">First Name</th>
            <th scope="col">Last Name</th>
            <th scope="col">List Name</th>
            <th scope="col">Actions</th>
          </tr>
        </thead>
        <tbody>
          {isLoading ? (
            <div className="spinner-border" role="status"></div>
          ) : (
            subscriberListArray?.length &&
            subscriberListArray.map((item) => (
              <tr key={item.id}>
                <th scope="row">{item.id}</th>
                <td>{item.firstName}</td>
                <td>{item.lastName}</td>
                <td>
                  {typeof item.leadlist === "number" && LeadList[item.leadlist]}
                </td>
                <td>
                  <button
                    className="btn btn-dark"
                    onClick={() => {
                      if (
                        typeof item.leadlist === "number" &&
                        typeof item.id === "number"
                      )
                        getListDetailsById(item.leadlist, item.id);
                    }}
                  >
                    Make Call
                  </button>
                  <button
                    className="btn btn-dark ms-3"
                    onClick={() => {
                      if (typeof item.id === "number") {
                        DeleteSubscriberHandle(item?.id);
                      }
                    }}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ActionsPage;
