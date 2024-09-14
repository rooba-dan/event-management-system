import React from 'react';
import { useNotification } from '../../hooks/useNotification';
import Notification from './Notification';

function NotificationList() {
  const { notifications, removeNotification } = useNotification();

  return (
    <div className="fixed top-4 right-4 z-50">
      {notifications.map((notification) => (
        <div key={notification.id} className="mb-2">
          <Notification
            message={notification.message}
            type={notification.type}
            onClose={() => removeNotification(notification.id)}
          />
        </div>
      ))}
    </div>
  );
}

export default NotificationList;