import {
  CallResponse,
  CallsApi,
  CampaignResponse,
  CampaignsApi,
  InboundCallResponse,
  ListsApi,
  ListsResponse,
} from "@dynopii/callchimp";
import { useEffect, useMemo, useState } from "react";

import { config } from "../API/ConfigAPI";

const Dashboard = () => {
  const ListsAPI = useMemo(() => new ListsApi(config), []);
  const [Lists, setLists] = useState<ListsResponse[] | undefined>([]);

  const CampaignsAPI = useMemo(() => new CampaignsApi(config), []);
  const [campaignsList, setCampaignsList] = useState<
    CampaignResponse[] | undefined
  >([]);

  const CallsAPI = useMemo(() => new CallsApi(config), []);
  const [inboundCallsList, setInboundCallsList] = useState<
    InboundCallResponse[] | undefined
  >([]);

  const [outboundCallsList, setOutboundCallsList] = useState<
    CallResponse[] | undefined
  >([]);

  useEffect(() => {
    const Campaigns = CampaignsAPI.campaignsList();
    Campaigns.then((res) => {
      setCampaignsList(res.results);
      console.log(res.results);
    }).catch((error) => {
      console.error(error);
    });

    const List = ListsAPI.listsList();
    List.then((res) => {
      setLists(res.results);
    }).catch((error) => {
      console.error(error);
    });

    const InboundCalls = CallsAPI.callsListInbound();
    InboundCalls.then((res) => {
      setInboundCallsList(res.results);
    }).catch((error) => {
      console.error(error);
    });

    const OutboundCalls = CallsAPI.callsListOutbound();
    OutboundCalls.then((res) => {
      setOutboundCallsList(res.results);
      console.log(res.results);
    }).catch((error) => {
      console.error(error);
    });
  }, [CallsAPI, CampaignsAPI, ListsAPI]);

  return (
    <div className="p-5">
      <div className="row">
        <div className="col-md-6">
          <table className="table table-dark table-striped caption-top">
            <caption className="fw-bold text-dark">Campaigns</caption>
            <thead>
              <tr>
                <th scope="col">ID</th>
                <th scope="col">Name</th>
                <th scope="col">Type</th>
                <th scope="col">Supervisor</th>
                <th scope="col">Active</th>
                <th scope="col">Recording</th>
              </tr>
            </thead>
            <tbody>
              {campaignsList?.map((item) => (
                <tr key={item.id}>
                  <td>{item.id}</td>
                  <td>{item.name}</td>
                  <td>{item.type}</td>
                  <td>{item.supervisors}</td>
                  <td>
                    <span
                      className={`text-${item.isActive ? "success" : "danger"}`}
                    >
                      {item.isActive ? "Active" : "Not Active"}
                    </span>
                  </td>
                  <td>
                    <span
                      className={`text-${
                        item.isRecording ? "success" : "danger"
                      }`}
                    >
                      {item.isRecording ? "Recording" : "Not Recording"}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="col-md-6">
          <table className="table table-dark table-striped caption-top">
            <caption className="fw-bold text-dark">Lists</caption>
            <thead>
              <tr>
                <th scope="col">ID</th>
                <th scope="col">Name</th>
                <th scope="col">Description</th>
                <th scope="col">Campaign</th>
                <th scope="col">Active</th>
              </tr>
            </thead>
            <tbody>
              {Lists?.map((item) => (
                <tr key={item.id}>
                  <td>{item.id}</td>
                  <td>{item.name}</td>
                  <td>{item.description}</td>
                  <td>{item.campaign}</td>
                  <td>
                    <span
                      className={`text-${item.isactive ? "success" : "danger"}`}
                    >
                      {item.isactive ? "Active" : "Not Active"}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="col-md-6">
          <table className="table table-dark table-striped caption-top">
            <caption className="fw-bold text-dark">Inbound Calls</caption>
            <thead>
              <tr>
                <th scope="col">ID</th>
                <th scope="col">Inbound Caller</th>
                <th scope="col">Time</th>
                <th scope="col">Hangup Cause</th>
                <th scope="col">Answered</th>
              </tr>
            </thead>
            <tbody>
              {inboundCallsList?.length ? (
                inboundCallsList?.map((item) => (
                  <tr key={item.id}>
                    <td>{item.id}</td>
                    <td>{item.inboundCaller}</td>
                    <td>{item.duration}</td>
                    <td></td>
                    <td>
                      <span
                        className={`text-${
                          item.isAnswered ? "success" : "danger"
                        }`}
                      >
                        {item.isAnswered ? "Answered" : "Not Answered"}
                      </span>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5}>No Calls To display</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        <div className="col-md-6">
          <table className="table table-dark table-striped caption-top">
            <caption className="fw-bold text-dark">Outbound Calls</caption>
            <thead>
              <tr>
                <th scope="col">ID</th>
                <th scope="col">Subscriber</th>
                <th scope="col">Dial Status:</th>
                <th scope="col">Hangup Cause</th>
                <th scope="col">Deposition</th>
                <th scope="col">Answered</th>
              </tr>
            </thead>
            <tbody>
              {outboundCallsList?.length ? (
                outboundCallsList?.map((item) => (
                  <tr key={item.id}>
                    <td>{item.id}</td>
                    <td>{item.lead}</td>
                    <td>{item.dialStatus}</td>
                    <td>{item.hangupCause}</td>
                    <td>{item.disposition}</td>
                    <td>
                      <span
                        className={`text-${
                          item.isAnswered ? "success" : "danger"
                        }`}
                      >
                        {item.isAnswered ? "Answered" : "Not Answered"}
                      </span>
                    </td>
                  </tr>
                ))
              ) : (
                <td>No Calls To display</td>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
