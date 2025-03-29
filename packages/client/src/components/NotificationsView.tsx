import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { ScrollArea } from '../components/ui/scroll-area';
import {
  Bell,
  CheckCircle,
  AlertCircle,
  XCircle,
  X,
  Info,
} from 'lucide-react';
import { Notification } from '../types/businessDashboardTypes';

interface NotificationsViewProps {
  notifications: Notification[];
  unreadCount: number;
  activeFilter: string;
  setActiveFilter: (filter: string) => void;
  markAsRead: (id: number) => void;
  markAllAsRead: () => void;
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const NotificationsView: React.FC<NotificationsViewProps> = ({
  notifications,
  unreadCount,
  activeFilter,
  setActiveFilter,
  markAsRead,
  markAllAsRead,
}) => {
  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="p-6"
    >
      <Card>
        <CardHeader>
          <CardTitle className="text-3xl font-bold text-primary">
            Notifications Center
          </CardTitle>
          <p className="text-muted-foreground">Stay updated on your contracts and payments</p>
        </CardHeader>
        <CardContent>
          <div className="flex justify-between items-center mb-6">
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground">{unreadCount} unread</span>
              {unreadCount > 0 && (
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-xs text-primary hover:text-primary/80 transition-colors font-medium"
                  onClick={markAllAsRead}
                >
                  Mark all as read
                </Button>
              )}
            </div>
          </div>

          <div className="flex gap-2 overflow-x-auto pb-4">
            <Button
              variant={activeFilter === 'all' ? 'secondary' : 'outline'}
              size="sm"
              onClick={() => setActiveFilter('all')}
            >
              All
            </Button>
            <Button
              variant={activeFilter === 'payment' ? 'secondary' : 'outline'}
              size="sm"
              onClick={() => setActiveFilter('payment')}
            >
              Payments
            </Button>
            <Button
              variant={activeFilter === 'contract' ? 'secondary' : 'outline'}
              size="sm"
              onClick={() => setActiveFilter('contract')}
            >
              Contracts
            </Button>
            <Button
              variant={activeFilter === 'message' ? 'secondary' : 'outline'}
              size="sm"
              onClick={() => setActiveFilter('message')}
            >
              Messages
            </Button>
            <Button
              variant={activeFilter === 'meeting' ? 'secondary' : 'outline'}
              size="sm"
              onClick={() => setActiveFilter('meeting')}
            >
              Meetings
            </Button>
          </div>

          <div className="border rounded-md">
            {notifications.length === 0 ? (
              <div className="p-12 text-center">
                <Bell className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground">No notifications to display</p>
              </div>
            ) : (
              <ScrollArea className="max-h-[600px]">
                <div className="divide-y">
                  {notifications.map(notification => (
                    <motion.div
                      key={notification.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className={`p-4 relative ${!notification.isRead ? 'bg-muted/40' : ''}`}
                    >
                      <div className="flex gap-4">
                        <div
                          className={`flex-shrink-0 rounded-full p-2 ${
                            notification.type === 'success'
                              ? 'bg-green-100 text-green-600'
                              : notification.type === 'error'
                                ? 'bg-red-100 text-red-600'
                                : notification.type === 'warning'
                                  ? 'bg-yellow-100 text-yellow-600'
                                  : 'bg-blue-100 text-blue-600'
                          }`}
                        >
                          {notification.type === 'success' && (
                            <CheckCircle className="h-5 w-5" />
                          )}
                          {notification.type === 'error' && <XCircle className="h-5 w-5" />}
                          {notification.type === 'warning' && (
                            <AlertCircle className="h-5 w-5" />
                          )}
                          {notification.type === 'info' && <Info className="h-5 w-5" />}
                        </div>
                        <div className="flex-1">
                          <div className="flex justify-between">
                            <h3
                              className={`font-medium ${!notification.isRead ? 'text-primary' : ''}`}
                            >
                              {notification.title}
                            </h3>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-6 w-6"
                              onClick={() => markAsRead(notification.id)}
                            >
                              <X className="h-4 w-4" />
                            </Button>
                          </div>
                          // ... existing code ...
                          <p className="text-sm text-muted-foreground mt-1">
                            {notification.message}
                          </p>
                          <p className="text-xs text-muted-foreground mt-2">
                            {notification.date}
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </ScrollArea>
            )}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default NotificationsView;