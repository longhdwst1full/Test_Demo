import { IResData, IResVideoLive } from '@/models/type';
import { useEffect, useState } from 'react';
import { IResponse, useSevices } from '../useServices/useSevices';

export default function useGetVideoList() {
  const { getCaller } = useSevices()
  const [videoList, setVideoList] = useState<IResVideoLive[]>([]);
  const [isLoading, setLoading] = useState<boolean>(false);

  useEffect(() => {

    getData();
  }, []);

  const getData = async () => {
    try {
      setLoading(true);

      const { data } = await getCaller<IResponse<IResData<IResVideoLive[]>>>('video-live/getAll')
      console.log(':data:', data.payload);
      setLoading(false);

      setVideoList(data.payload.data);
    }
    catch (e) {
      setLoading(false);


    }
  };
  return { videoList, isLoading }
}
